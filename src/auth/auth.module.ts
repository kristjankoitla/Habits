import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { DatabaseModule } from "src/database/database.module";
import { Habit } from "src/habit/habit.entity";
import { User } from "src/user/user.entity";
import { Connection } from "typeorm";
import * as jwtConstants from "../../jwt-constants.json";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
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
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: "24h" },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, ...authProviders],
    exports: [AuthService],
})
export class AuthModule {}
