import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsEmail, Length, IsOptional } from 'class-validator';

export class PaginationModel{
    @ApiProperty({
        example: 0,
        description: 'Page number',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => (value === '' ? '0' : value))
    page: string = '0';
    
    @ApiProperty({
        example: 10,
        description: 'Number of items per page',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => (value === '' ? '10' : value))
    limit: string = '10';

    @ApiProperty({
        example: 'id',
        description: 'Field to sort by',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => (value === '' ? 'id' : value))
    sortBy: string = 'id';

    @ApiProperty({
        example: 'asc',
        description: 'Sort order (asc or desc)',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => (value === '' ? 'asc' : value))
    sortOrder: string = 'asc';

    @ApiProperty({
        example: '',
        description: 'Search term',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => (value === '' ? '' : value))
    search: string = '';
}