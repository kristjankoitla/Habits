import { Module } from "@nestjs/common";
import { HabitModule } from "./habit/habit.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from './auth/auth.module';
import { AppController } from "./app.controller";

@Module({
    imports: [UserModule, HabitModule, AuthModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
