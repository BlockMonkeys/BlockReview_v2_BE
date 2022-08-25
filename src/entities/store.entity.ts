import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { STORE_CATEGORY } from "./types";
import { User } from "./user.entity";

@Entity()
export class Store extends BaseEntity {
    @PrimaryColumn()
    @ApiProperty({ description: "uuid" })
    id: string;

    @Column({ nullable: false })
    @ApiProperty({ description: "Store Name" })
    name : string;

    @Column({ nullable : true })
    @ApiProperty({ description: "Store Description" })
    description : string;

    @Column({ nullable : true })
    @ApiProperty({ description : "Store Address" })
    address : string;

    @Column({ nullable : true })
    @ApiProperty({ description : "Store TEL Number" })
    tel : string;
    
    @Column({ nullable : false })
    @ApiProperty({ description : "Store Category" })
    category : STORE_CATEGORY

    @Column({ type: 'timestamptz', default : () => "NOW()" })
    @ApiProperty({ description : "Store Creation date" })
    registeredAt : Date

    @Column({ nullable : false })
    @ApiProperty({ description : "Store Image" })
    imgUrl : string;

    @OneToOne(() => User, user => user.store)
    @ApiProperty({ type : () => User, description: "Store Created User" })
    user : User
}