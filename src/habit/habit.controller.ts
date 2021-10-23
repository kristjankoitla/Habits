import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { EntryService } from "src/entry/entry.service";
import { Habit } from "./habit.entity";
import { HabitService } from "./habit.service";

@Controller("habits")
export class HabitController {
    constructor(private readonly habitService: HabitService, private readonly entryService: EntryService) {}

    @Get()
    getHabits() {
        return this.habitService.getAll();
    }

    @Post()
    createHabit(@Body() habit: Habit) {
        this.habitService.create(habit);
    }

    @Get()
    getEntries(@Param(":habitId/entries") habitId: number) {
        return this.entryService.getByHabitId(habitId);
    }
}
