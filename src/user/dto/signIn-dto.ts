import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(50)
    @ApiProperty({ description : "Email" })
    email : string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9]*$/, {
        message : "Not Proper EOA"
    })
    @ApiProperty({ description : "EOA Public Key" })
    eoa : string;
}