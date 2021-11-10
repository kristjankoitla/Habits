import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Connection } from "typeorm";
import { User } from "./user.entity";

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
    exports: [UserService, ...userProviders],
})
export class UserModule {}
