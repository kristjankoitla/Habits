import { Module } from "@nestjs/common";
import { Connection } from "typeorm";
import { DatabaseModule } from "../database/database.module";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";

export const userProviders = [
    {
        provide: "USER_REPOSITORY",
        useFactory: (connection: Connection) => connection.getRepository(User),
        inject: ["DATABASE_CONNECTION"],
    },
];

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [...userProviders, UserService],
})
export class UserModule {}
