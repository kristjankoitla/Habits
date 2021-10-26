import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { EntryModule } from "src/entry/entry.module";
import { Connection } from "typeorm";
import { HabitController } from "./habit.controller";
import { Habit } from "./habit.entity";
import { HabitService } from "./habit.service";
import { userProviders } from "src/user/user.module";

const habitProviders = [
    {
        provide: "HABIT_REPOSITORY",
        useFactory: (connection: Connection) => connection.getRepository(Habit),
        inject: ["DATABASE_CONNECTION"],
    },
];

@Module({
    imports: [DatabaseModule, EntryModule],
    controllers: [HabitController],
    providers: [...habitProviders, ...userProviders, HabitService],
})
export class HabitModule {}
