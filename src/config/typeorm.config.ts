import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    type : "postgres",
    host : "localhost",
    port : 5432,
    username : "postgres",
    password : "0608",
    database : "blockreview",
    entities : [__dirname + "/../**/*.entity.{js,ts}"],
    synchronize: true
}