import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/create-user-dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService : UserService){}
    
    // 모든 유저 조회
    @Get("/")
    getUser (){
        return this.userService.getAllUser();
    }
    
    // 회원가입
    @Post("/register")
    registerUser(registerUserDto : RegisterUserDto){
        return this.userService.registerUser(registerUserDto);
    }

}
