import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Store } from "src/entities/store.entity";
import { USER_TYPE } from "src/entities/types";

export class RegisterUserDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9]*$/, {
        message : "Not Proper EOA"
    })
    @IsNotEmpty()
    @ApiProperty({ description : "EOA Public Key" })
    eoa : string;

    @IsNotEmpty()
    @ApiProperty({ description : "EOA Sign" })
    signature : string;

    @IsEmail()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(50)
    @ApiProperty({ description : "User Email" })
    email : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description : "User Phone Number" })
    phoneNumber : string;
    
    @IsNotEmpty()
    @ApiProperty({ description : "User Type (0 = 사업자, 1 = 일반유저)" })
    userType : USER_TYPE;

    @ApiProperty({ description : "Company Registeration Number (사업자 등록번호)" })
    crnNumber : string | null;
}