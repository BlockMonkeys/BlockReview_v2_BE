import { BadRequestException, ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { RegisterUserDto } from "./dto/registerUser-dto";
import { SignInDto } from "./dto/signIn-dto";

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    // 모든 유저 조회
    async getAllUser() : Promise<User[]> {
        try {
            const tx = await this.find();
            return tx;
        } catch (e) {
            throw new BadRequestException();   
        }
    }

    // 회원가입
    async registerUser(registerUserDto : RegisterUserDto) : Promise<User> {
        const { eoa, signature, email, phoneNumber, userType, crnNumber } = registerUserDto;
        // 이미 존재하는 유저인지 확인;
        const currentUser = await this.findOneBy({ 
            signature
        });
        
        if(currentUser){
            throw new ConflictException("Already Exist");
        }

        // DB 삽입;
        try {
            const tx = await this.create({
                eoa, 
                signature,
                email,
                phoneNumber,
                userType,
                crnNumber
            });
    
            await this.save(tx);
            return tx;
        } catch (e) {
            throw new BadRequestException();   
        }
    }

    // 로그인
    async signInUser(signInDto : SignInDto) : Promise<User> {
        const { eoa, email } = signInDto; 
        
        const user = await this.findOneBy({
            eoa
        });
        
        return user;
    }

    // Email 중복체크
    async duplicateCheck(email : string) : Promise<boolean> {
        const tx = await this.findOneBy({
            email
        })
        // Email이 이미 존재하면 false
        // OR true
        if(tx){
            return false;
        } else {
            return true;
        }
    }

}