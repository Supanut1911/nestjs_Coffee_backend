import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const PlayGroundTypeOrmConfig: TypeOrmModuleOptions = {
    // type: 'postgres',
    // host: process.env.DB_HOST,
    // port: parseInt(process.env.DB_PORT),
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASS,
    // database: process.env.DB_AUTH,
    // synchronize: true
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'db_playground',
    synchronize: true
}