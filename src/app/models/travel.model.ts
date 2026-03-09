import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length } from "class-validator";

export class travel{

    @ApiProperty({
        example: 1,
        description: 'ID of the client',
        required: true,
    })
    @IsNumber()
    clientId: number;


    @ApiProperty({
        example: 1,
        description: 'ID of the driver',
        required: true,
    })
    @IsNumber()
    driverId: number;
}