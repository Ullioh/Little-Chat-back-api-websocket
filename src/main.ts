import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // 1. Importa esto

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 2. Configura Swagger
  const config = new DocumentBuilder()
    .setTitle('Chat API')
    .setDescription('Endpoints para el sistema de chat')
    .setVersion('1.0')
    .addTag('v1/chats')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  
  // 3. Define la ruta donde verás la documentación
  SwaggerModule.setup('api', app, document); 

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();