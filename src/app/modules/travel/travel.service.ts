import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma/services/prisma.service';
import {travel} from 'src/app/models/travel.model';
import { ResponseModel, ResponsePaginationModel } from 'src/app/models/response.model';
import { PaginationModel } from 'src/app/models/pagination.model';


@Injectable()
export class TravelService {

  constructor(
    private prisma: PrismaService,
  ){}

  async create(create: travel) {
    const travel = await this.prisma.travels.create({
      data: {
        ...create,
      },
    });
    return new ResponseModel(travel, 'travel created', 201);
  }

  async findAll(pagination:PaginationModel) {
   let where = {
    status: 1
   };
   const travel = await this.prisma.travels.findMany({
    skip: parseInt(pagination.page) * parseInt(pagination.limit),
    take: parseInt(pagination.limit),
    orderBy: {
      [pagination.sortBy]: pagination.sortOrder,
    },
    where: where
   });
   const totalCount = await this.prisma.travels.count({ where });

    let data: ResponsePaginationModel = {
      rows: travel,
      totalCount: totalCount,
      page: parseInt(pagination.page),
      limit: parseInt(pagination.limit),
      sortBy: pagination.sortBy,
      sortOrder: pagination.sortOrder,
      search: pagination.search,
    }
    return new ResponseModel(data, 'travels found', 200);
  }

  
  findOne(id: number) {
    return `This action returns a #${id} travel`;
  }

  update(id: number, update: travel) {
    return `This action updates a #${id} travel`;
  }

  remove(id: number) {
    return `This action removes a #${id} travel`;
  }
}
