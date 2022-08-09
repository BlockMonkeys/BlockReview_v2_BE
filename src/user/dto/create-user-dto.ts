import { IsNotEmpty } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty()
    eoa : string;

    @IsNotEmpty()
    email : string;

    phoneNumber : number;
    
    @IsNotEmpty()
    userType : number;

    crnNumber : number | null;
}