import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { STORE_CATEGORY } from "src/entities/types";

export class CreateStoreDto {
    @IsNotEmpty()
    @ApiProperty({ description : "Store Name" })
    name : string;
    
    @IsNotEmpty()
    @ApiProperty({ description: "Store Description" })
    description : string;

    @IsNotEmpty()
    @ApiProperty({ description : "Store Address" })
    address : string;

    @IsNotEmpty()
    @ApiProperty({ description : "Store TEL" })
    tel : string;

    @IsNotEmpty()
    @ApiProperty({ description : "Store STORE_CATEGORY" })
    category : STORE_CATEGORY;

    @IsNotEmpty()
    @ApiProperty({ description: "Store Image" })
    imgUrl: string;
}