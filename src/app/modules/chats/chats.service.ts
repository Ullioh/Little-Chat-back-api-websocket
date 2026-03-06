import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma/services/prisma.service';
import { ApiTags } from '@nestjs/swagger';
import {chat} from 'src/app/models/chat.model';


@Injectable()
export class ChatsService {

  constructor(
    private prisma: PrismaService,
  ){}


  create(createChatDto: chat) {
    return 'This action adds a new chat';
  }

  findAll() {
    return `This action returns all chats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: chat) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
