import { Module } from "@nestjs/common";
import { HabitModule } from "./habit/habit.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { EntryModule } from "./entry/entry.module";

@Module({
    imports: [AuthModule, UserModule, HabitModule, EntryModule],
    providers: [],
})
export class AppModule {}
