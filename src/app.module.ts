import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PassportModule } from "@nestjs/passport";
import { StoreModule } from './store/store.module';
import { AwsModule } from './aws/aws.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PassportModule.register({ defaultStrategy : "jwt" }),
    JwtModule.register({
      secret : "Blockmonkey",
      signOptions: {
        expiresIn : (60 * 60) * 2 // 3600 * 2 = 2 Hours
      }
    }),
    TypeOrmModule.forRoot({
      type : "postgres",
      host : process.env.DB_HOST,
      port : Number(process.env.DB_PORT),
      username : String(process.env.DB_USERNAME),
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE,
      entities : [__dirname + "/entities/**/*.entity.{js,ts}"],
      synchronize: true
    }),
    UserModule,
    StoreModule,
    AwsModule
  ]
})

export class AppModule {}
