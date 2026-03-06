import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { PaginationModel } from 'src/app/models/pagination.model';
import { ResponseModel, ResponsePaginationModel } from 'src/app/models/response.model';
import {chat} from 'src/app/models/chat.model';
import { ApiTags } from '@nestjs/swagger';


@Controller('v1/chats')
@ApiTags('v1/chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post('create')
  create(@Body() create: chat) {
    return this.chatsService.create(create);
  }

  
  @Get()
  findAll() {
    return this.chatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() update: chat) {
    return this.chatsService.update(+id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatsService.remove(+id);
  }
}
