import { Body, Controller, Get, Param, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';
import { RegisterUserDto } from './dto/registerUser-dto';
import { SignInDto } from './dto/signIn-dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User Auth APIs')
export class UserController {
    constructor(private userService : UserService){}
    
    // 모든 유저 조회
    @Get("/")
    @ApiOperation({ summary : "모든 유저 조회 API", description: "가입된 모든 유저 조회 API" })
    @ApiOkResponse({
        type : [User]
    })
    getUser() : Promise<User[]> {
        return this.userService.getAllUser();
    }
    
    // 회원가입
    @Post("/register")
    @ApiOperation({ summary : "회원가입 API", description: "새로운 유저 등록 API" })
    @ApiOkResponse({
        type : User
    })
    registerUser(@Body(ValidationPipe) registerUserDto : RegisterUserDto) : Promise<User> {
        return this.userService.registerUser(registerUserDto);
    }
    
    // 로그인
    @Post("/login")
    @ApiOperation({ summary : "로그인 API", description: "로그인 API" })
    @ApiOkResponse({
        schema: {
            type : "object",
            example : {
                accessToken : "string"
            }
        }
    })
    signInUser(@Body(ValidationPipe) signInDto : SignInDto) : Promise<{ accessToken : string }>  {
        return this.userService.signInUser(signInDto);
    }

    // JWT Token Validation Check
    @Post("/auth")
    @ApiOperation({ summary : "JWT Auth Check API", description: "Authentication Check API" })
    @ApiOkResponse({
        schema : {
            type : "object",
            example : {
                auth : true,
                eoa: "string",
                signature: "string",
                email: "string",
                phoneNumber: "string",
                userType: 0,
                registeredAt: "2022-08-23T09:01:49.403Z",
                crnNumber: "string",
                store : {},
                likedStore : []
            }
        }
    })
    @UseGuards(AuthGuard())
    async authCheck(@Req() req) {
        return this.userService.authCheck(req.user);
    }

    // Email 중복체크
    @Get("/duplicate/email/:email")
    @ApiOperation({ summary : "이메일 중복체크 API", description: "중복체크 API(이메일)" })
    async duplicateCheck(@Param("email") email) : Promise<boolean> {
        return this.userService.duplicateCheck(email);
    }
}