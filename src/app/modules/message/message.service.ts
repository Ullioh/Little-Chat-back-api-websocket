import { Injectable } from '@nestjs/common';
import { PaginationModel } from 'src/app/models/pagination.model';
import { ResponseModel, ResponsePaginationModel } from 'src/app/models/response.model';
import {message} from 'src/app/models/message.model';
import { PrismaService } from 'src/app/prisma/services/prisma.service';

@Injectable()
export class MessageService {

  constructor(
    private prisma: PrismaService,
  ){}


  create(createMessageDto: message) {
    return 'This action adds a new message';
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: message) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
