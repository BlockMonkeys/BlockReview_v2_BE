import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { RegisterUserDto } from "./dto/create-user-dto";

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    // 모든 유저 조회
    async getAllUser() {
        const result = await this.find();
        return result;
    }

    // 회원가입
    async registerUser(registerUserDto : RegisterUserDto) {
        const { eoa, email, phoneNumber, userType, crnNumber } = registerUserDto;

        const tx = this.create({
            eoa, 
            email,
            phoneNumber,
            userType,
            crnNumber
        });

        await this.save(tx);
        return tx;
    }



}