import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { Habit } from "./habit.entity";
import { HabitService } from "./habit.service";

@Controller("habits")
export class HabitController {
    constructor(private readonly habitService: HabitService) {}

    @Get()
    getHabits() {
        return this.habitService.getAll();
    }

    @Post()
    createHabit(@Body() habit: Habit) {
        this.habitService.create(habit);
    }

    @Post(":habitId/entries")
    createEntry(@Param('habitId') habitId: number) {
        // create entry
    }

    @Get(":habitId/entries")
    getEntries(@Param('habitId') habitId: number) {
        // get all entries
    }

    @Delete(":habitId/entries/:entryId")
    deleteEntry(@Param('habitId') habitId: number, @Param('entryId') entryId: number) {
        // delete entry
    }
}
