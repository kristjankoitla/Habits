import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards,
    Request,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { EntryService } from "src/entry/entry.service";
import { HabitRequest } from "./habit.entity";
import { HabitService } from "./habit.service";

@Controller("habits")
export class HabitController {
    constructor(
        private readonly habitService: HabitService,
        private readonly entryService: EntryService,
    ) {}

    @Get()
    getHabits() {
        return this.habitService.getAll();
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    createHabit(@Request() req, @Body() habitRequest: HabitRequest) {        
        if (req.user.userId !== habitRequest.userId) {
            return "unauthorized";
        }

        return this.habitService.create(habitRequest);
    }

    @Get()
    getEntries(@Param(":habitId/entries") habitId: number) {
        this.entryService.getByHabitId(habitId);
    }
}
