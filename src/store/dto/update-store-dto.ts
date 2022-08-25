import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateStoreDto {
    @IsNotEmpty()
    @ApiProperty({ description : "Store UUID" })
    storeId : string;
    
    @IsNotEmpty()
    @ApiProperty({ description: "Update Description" })
    description : string;
}