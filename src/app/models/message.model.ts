import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length } from "class-validator";

export class message {

    @ApiProperty({
        example: 1,
        description: 'ID of the chat',
        required: true,
    })
    @IsNumber()
    travelId: number;

    @ApiProperty({
        example: 1,
        description: 'ID of the sender (client or driver)',
        required: true,
    })
    @IsNumber()
    senderId: number;

    @ApiProperty({
        example: 'Hello, I need help with my order.',
        description: 'Content of the message',
        required: true,
    })
    @IsString()
    @Length(1, 500)
    message: string;
}