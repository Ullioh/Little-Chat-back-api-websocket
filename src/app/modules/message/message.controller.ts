import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import {message} from 'src/app/models/message.model';
import { PaginationModel } from 'src/app/models/pagination.model';
import { ApiTags } from '@nestjs/swagger';

@Controller('v1/messages')
@ApiTags('v1/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('create')
  create(@Body() create: message) {
    return this.messageService.create(create);
  }

  @Get('get')
  findAll(@Query() pagination: PaginationModel) {
    return this.messageService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: message) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
