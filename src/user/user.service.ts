import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/create-user-dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private userRepo : UserRepository
    ){}

    // 모든 유저 조회
    getAllUser() {
        return this.userRepo.getAllUser();
    }
    
    // 회원가입
    registerUser(registerUserDto : RegisterUserDto) {
        return this.userRepo.registerUser(registerUserDto);    
    }
}
