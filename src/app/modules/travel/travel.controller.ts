import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { TravelService } from './travel.service';
import { PaginationModel } from 'src/app/models/pagination.model';
import {travel} from 'src/app/models/travel.model';
import { ApiTags } from '@nestjs/swagger';


@Controller('v1/travels')
@ApiTags('v1/travels')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Post('create')
  create(@Body() create: travel) {
    return this.travelService.create(create);
  }

  
  @Get('get')
  findAll(@Query() pagination: PaginationModel) {
    return this.travelService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() update: travel) {
    return this.travelService.update(+id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelService.remove(+id);
  }
}
