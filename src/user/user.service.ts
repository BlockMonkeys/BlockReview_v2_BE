import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { RegisterUserDto } from './dto/registerUser-dto';
import { SignInDto } from './dto/signIn-dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private userRepo : UserRepository,
        private jwtService : JwtService
    ){}

    // 모든 유저 조회
    async getAllUser() : Promise<User[]> {
        return this.userRepo.getAllUser();
    }
    
    // 회원가입
    async registerUser(registerUserDto : RegisterUserDto) : Promise<User> {
        return this.userRepo.registerUser(registerUserDto);
    }

    // 로그인
    async signInUser(signInDto : SignInDto) : Promise<{accessToken : string}> {
        const { eoa, email } = signInDto; 
        const user = this.userRepo.signInUser(signInDto);

        if(!user) {
            throw new UnauthorizedException("Login Failed");
        }
        
        //로그인 성공 => 유저 토큰 생성 (Secret + Payload);
        const payload = {
            eoa
        }
        
        // JWT Token Generate
        const accessToken = await this.jwtService.sign(payload);
        
        return { accessToken : accessToken };
    }

    // ID 중복 체크
    async duplicateCheck(email : string) : Promise<boolean> {
        return this.userRepo.duplicateCheck(email);
    }

    // Authentication Check
    async authCheck(user : User) {
        const result = user["auth"] = true;
        return result;
    }
}
