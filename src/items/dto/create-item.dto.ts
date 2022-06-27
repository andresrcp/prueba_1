import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateItemDto {

    @IsNotEmpty()
    readonly name: string;

    @IsNumber()
    readonly price: number;

    
    readonly description: string;
}
