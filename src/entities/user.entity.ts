import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Store } from "./store.entity";
import { USER_TYPE } from "./types";

@Entity()
export class User extends BaseEntity {
    @PrimaryColumn()
    @ApiProperty({ description: "EOA public key" })
    eoa: string;

    @Column({ nullable: false, unique : true})
    @ApiProperty({ description : "User Signature" })
    signature : string;

    @Column({ nullable : false, unique: true })
    @ApiProperty({ description: "User Email" })
    email : string;

    @Column({ nullable : true, unique : true })
    @ApiProperty({ description: "User Phone Number" })
    phoneNumber : string;

    @Column({ nullable : false })
    @ApiProperty({ description : "User Type (0 = 사업자, 1 = 일반유저)" })
    userType : USER_TYPE

    @Column({ nullable : true })
    @ApiProperty({ description : "Company Registeration Number (사업자 등록번호)" })
    crnNumber : string | null;

    @Column({ type: 'timestamptz', default : () => "NOW()" })
    @ApiProperty({ description : "Store Creation date" })
    registeredAt : Date

    @OneToOne(() => Store, (store) => store.user, { eager : true })
    @JoinColumn()
    @ApiProperty({ description: "점주 유저가 등록한 Store" })
    store: Store
}