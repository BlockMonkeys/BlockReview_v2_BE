import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryColumn()
    eoa: string;

    @Column({ nullable : false })
    email : string;

    @Column()
    phoneNumber : number;

    @Column({ nullable : false })
    userType : number

    @Column({ nullable : true })
    crnNumber : number;
}