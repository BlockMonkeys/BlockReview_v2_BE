import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { JwtStrategy } from './jwt.strategy';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports : [
    PassportModule.register({ defaultStrategy : "jwt" }),
    JwtModule.register({
      secret : process.env.JWT_SECRET,
      signOptions: {
        expiresIn : (60 * 60) * 2 // 3600 * 2 = 2 Hours
      }
    }),
    TypeOrmExModule.forCustomRepository([UserRepository])
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports : [JwtStrategy, PassportModule]
})

export class UserModule {}
