import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {

    readonly name: string;

    readonly email: string;

    readonly password: string;
}
