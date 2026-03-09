import {WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket, MessageBody, WsException} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from '../message/message.service';
import { message } from 'src/app/models/message.model';
import { PaginationModel } from 'src/app/models/pagination.model';

@WebSocketGateway({
  cors: {
    origin: '*', // Configura esto según tus necesidades
    credentials: true,
  },
  namespace: 'chat',
})

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Almacenar usuarios conectados por sala
  private connectedUsers: Map<string, { socketId: string; userId: number; }> = new Map();

  constructor(private readonly messageService: MessageService) {}

  async handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
    
    // Obtener datos de la conexión
    const { travelId, userId, userType } = client.handshake.query;
    
    if (travelId && userId && userType) {
      // Unir al cliente a la sala específica del viaje
      const roomName = `travel_${travelId}`;
      await client.join(roomName);
      
      // Guardar información del usuario
      this.connectedUsers.set(client.id, {
        socketId: client.id,
        userId: Number(userId)
      });
      
      console.log(`Usuario ${userId} (${userType}) unido a sala ${roomName}`);
      
      // Notificar a otros usuarios en la sala
      client.to(roomName).emit('user-joined', {
        userId: Number(userId),
        userType,
        message: `Usuario ${userId} se ha unido al chat`,
      });
    }
  }

  async handleDisconnect(client: Socket) {
    const userInfo = this.connectedUsers.get(client.id);
    
    if (userInfo) {
      // Buscar todas las salas donde estaba el usuario
      const rooms = Array.from(client.rooms);
      
      rooms.forEach(room => {
        if (room.startsWith('travel_')) {
          client.to(room).emit('user-left', {
            userId: userInfo.userId,
            message: `Usuario ${userInfo.userId} ha abandonado el chat`,
          });
        }
      });
      
      this.connectedUsers.delete(client.id);
      console.log(`Cliente desconectado: ${client.id}`);
    }
  }

  @SubscribeMessage('join-travel-room')
  async handleJoinTravelRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { travelId: number; userId: number; userType: string },
  ) {
    const roomName = `travel_${data.travelId}`;
    
    // Unir al cliente a la sala
    await client.join(roomName);
    
    // Actualizar información del usuario
    this.connectedUsers.set(client.id, {
      socketId: client.id,
      userId: data.userId
    });
    
    // Obtener mensajes anteriores del viaje
    const previousMessages = await this.messageService.findAll(new PaginationModel());
    
    // Enviar mensajes anteriores al cliente que se unió
    client.emit('previous-messages', previousMessages);
    
    // Notificar a otros en la sala
    client.to(roomName).emit('user-joined', {
      userId: data.userId,
      userType: data.userType,
      timestamp: new Date(),
    });
    
    return { event: 'joined', data: { room: roomName } };
  }

  @SubscribeMessage('send-message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { travelId: number; message: string; senderId: number },
  ) {
    try {
      // Crear el mensaje en la base de datos
      const newMessage = new message();
      newMessage.travelId = data.travelId;
      newMessage.senderId = data.senderId;
      newMessage.message = data.message;
      
      const savedMessage = await this.messageService.create(newMessage);
      
      // Emitir el mensaje a todos en la sala
      const roomName = `travel_${data.travelId}`;
      this.server.to(roomName).emit('new-message', {
        id: savedMessage.data.id,
        travelId: data.travelId,
        senderId: data.senderId,
        message: data.message,
        createdAt: new Date(),
        status: 1,
      });
      
      return { event: 'message-sent', data: savedMessage };
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('typing')
  async handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { travelId: number; userId: number; isTyping: boolean },
  ) {
    const roomName = `travel_${data.travelId}`;
    client.to(roomName).emit('user-typing', {
      userId: data.userId,
      isTyping: data.isTyping,
    });
  }

  @SubscribeMessage('mark-as-read')
  async handleMarkAsRead(
    @MessageBody() data: { travelId: number; userId: number; messageIds: number[] },
  ) {
    // Aquí puedes implementar la lógica para marcar mensajes como leídos
    const roomName = `travel_${data.travelId}`;
    this.server.to(roomName).emit('messages-read', {
      userId: data.userId,
      messageIds: data.messageIds,
      readAt: new Date(),
    });
  }

  @SubscribeMessage('leave-travel-room')
  async handleLeaveTravelRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { travelId: number; userId: number },
  ) {
    const roomName = `travel_${data.travelId}`;
    await client.leave(roomName);
    
    client.to(roomName).emit('user-left', {
      userId: data.userId,
      timestamp: new Date(),
    });
    
    return { event: 'left', data: { room: roomName } };
  }
}