import { Module } from "@nestjs/common";
import { HabitModule } from "./habit/habit.module";
import { UserModule } from "./user/user.module";

@Module({
    imports: [UserModule, HabitModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
