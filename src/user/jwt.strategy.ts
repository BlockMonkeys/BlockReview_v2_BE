import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/entities/user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userRepo : UserRepository,
    ){
        super({
            secretOrKey : process.env.JWT_SECRET,
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload) {
        const { eoa } = payload;
        
        const user : User[] = await this.userRepo.find({
            where: {
                eoa
            }
        });

        if(!user.length) {
            throw new UnauthorizedException();
        }

        return user;
    }
}