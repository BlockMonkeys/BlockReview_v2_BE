import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { UserRepository } from 'src/user/user.repository';
import { StoreController } from './store.controller';
import { StoreRepository } from './store.repository';
import { StoreService } from './store.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    TypeOrmExModule.forCustomRepository([StoreRepository])
  ],
  controllers: [StoreController],
  providers: [StoreService]
})

export class StoreModule {}
