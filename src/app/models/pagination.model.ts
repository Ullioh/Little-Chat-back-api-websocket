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

export class PaginationProductModel extends PaginationModel{
    @ApiProperty({
        example: '1',
        description: 'Localidad ID to filter products',
        required: false,
    })
    @IsString()
    @IsOptional()
    @Transform(({ value }) => (value === '' ? '0' : value))
    localidadId: string = '';

    constructor(){
        super();
    }
}

export class PaginationZipCodeModel extends PaginationModel{
    @ApiProperty({
        example: '1',
        description: 'Localidad ID to filter zip codes',
        required: false,
    })
    @IsString()
    @IsOptional()
    @Transform(({ value }) => (value === '' ? '0' : value))
    localidadId: string = '';

    constructor(){
        super();
    }
}

export class PaginationProvinciaModel extends PaginationModel{
    @ApiProperty({
        example: '1',
        description: 'Country ID to filter provinces',
        required: true,
    })
    @IsString()
    countryId: string = '';
    
    constructor(){
        super();
    }
}

export class PaginationQuoteModel extends PaginationModel {

    @ApiProperty({
        example: 'verified',
        description: 'Filter by photo verification status (all, pending, verified)',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value || '')
    photoVerifiedStatus?: 'true' | 'false';

    @ApiProperty({
        example: '1',
        description: 'Filter by photofied verified',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value || '')
    clientId?: string;

    @ApiProperty({
        example: '1',
        description: 'Filter by user ID (vendedor)',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value || '')
    userId?: string;

    @ApiProperty({
        example: '1',
        description: 'Filter by vehicle ID',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value || '')
    vehicleId?: string;

    @ApiProperty({
        example: '1',
        description: 'Filter by zip code ID',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value || '')
    zipCodeId?: string;

    @ApiProperty({
        example: '1',
        description: 'Filter by card ID',
        required: false,
    })
    @IsOptional()
    @IsString()
    cardId?: string;
}

export class paginationVehicleModel extends PaginationModel {
    @ApiProperty({
        example: '1',
        description: 'Brand ID to filter vehicles',
        required: true,
    })
    @IsString()
    brandId: string = '';

    @ApiProperty({
        example: '1',
        description: 'Model ID to filter vehicles',
        required: true,
    })
    @IsString()
    modelId: string = '';

    constructor() {
        super();
    }
}

export class PaginationLocalidadModel extends PaginationModel{
    @ApiProperty({
        example: '1',
        description: 'partido ID to filter cities',
        required: true,
    })
    @IsString()
    departamentoId: string = '';

    constructor(){
        super();
    }
}

export class PaginationDepartamentoModel extends PaginationModel {
        @ApiProperty({
        example: '1',
        description: 'Provincia ID to filter partidos',
        required: false,
    })
    @IsString()
    @IsOptional()
    provinciaId: string = '';
    
        constructor() {
        super();
    }
}

export class PaginationClientModel extends PaginationModel {
    @ApiProperty({
        example: '1',
        description: 'Country ID to filter clients',
        required: false,
    })
    @IsString()
    @IsOptional()
    countryId: string = '';

    @ApiProperty({
        example: '1',
        description: 'Provincia ID to filter clients',
        required: false,
    })
    @IsString()
    @IsOptional()
    provinciaId: string = '';

    @ApiProperty({
        example: 'active',
        description: 'Filter by client status',
        required: false,
    })
    @IsOptional()
    @IsString()
    status: string = '';

        @ApiProperty({
        example: '12345678',
        description: 'DNI of the client',
        required: false,
    })
    @IsOptional()
    @IsString()
    dni:string = '';

    constructor() {
        super();
    }
}

export class PaginationModelModel extends PaginationModel {
    @ApiProperty({
        example: '1',
        description: 'Brand ID to filter models',
        required: true,
    })
    @IsString()
    brandId: string = '0';

    constructor() {
        super();
    }
}

export class PaginationCardModel extends PaginationModel {
    @ApiProperty({
        example: '1',
        description: 'Client ID to filter cards',
        required: false,
    })
    @IsString()
    @IsOptional()
    clientId: string;

    constructor() {
        super();
    }
}

export class PaginationArticleModel extends PaginationModel {
        @ApiProperty({
        example: 1,
        description: 'type of machinery, 2=vehicle, 1=motorcycle',
        required: false,
        })
        @IsOptional()
        @IsString()
        type?: string;
}

export class PaginationInfoVehicleModel extends PaginationModel {

    @ApiProperty({
        example: 'true',
        description: 'Filter by photo verified status (true or false)',
        required: false,
    })
    @IsOptional()
    @IsString()
    vehicle_type?: string;
}