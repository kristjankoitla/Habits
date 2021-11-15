import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { DatabaseModule } from "@src/database/database.module";
import { Habit } from "@src/habit/habit.entity";
import { User } from "@src/user/user.entity";
import { Connection } from "typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthSerializer } from "./serialization.provider";
import { LocalStrategy } from "./strategy/local.strategy";

const authProviders = [
    {
        provide: "USER_REPOSITORY",
        useFactory: (connection: Connection) => connection.getRepository(User),
        inject: ["DATABASE_CONNECTION"],
    },
    {
        provide: "HABIT_REPOSITORY",
        useFactory: (connection: Connection) => connection.getRepository(Habit),
        inject: ["DATABASE_CONNECTION"],
    },
];

@Module({
    imports: [
        DatabaseModule,
        PassportModule.register({
            session: true,
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthSerializer, LocalStrategy, ...authProviders],
    exports: [AuthService],
})
export class AuthModule {}
