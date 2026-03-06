import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length } from "class-validator";

export class message {

    @ApiProperty({
        example: 1,
        description: 'ID of the chat',
        required: true,
    })
    @IsNumber()
    chatId: number;

    @ApiProperty({
        example: 1,
        description: 'ID of the sender (client or driver)',
        required: true,
    })
    @IsNumber()
    senderId: number;

    @ApiProperty({
        example: 'client',
        description: 'Type of the sender (client or driver)',
        required: true,
    })
    @IsString()
    senderType: string;

    @ApiProperty({
        example: 'Hello, I need help with my order.',
        description: 'Content of the message',
        required: true,
    })
    @IsString()
    @Length(1, 500)
    content: string;
}