import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/strategy/jwt-auth.guard";
import { EntryService } from "src/entry/entry.service";
import { CreateHabitDto } from "./habit.dto";
import { HabitService } from "./habit.service";

@ApiTags("habits")
@Controller("habits")
export class HabitController {
    constructor(
        private readonly habitService: HabitService,
        private readonly entryService: EntryService,
    ) {}

    @Get()
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    getHabits(@Request() req) {
        return this.habitService.getByUserId(req.user.userId);
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    createHabit(@Request() req, @Body() createHabitDto: CreateHabitDto) {
        if (
            this.habitService.checkExists(req.user.userId, createHabitDto.name)
        ) {
            throw new HttpException("Duplicate habit", HttpStatus.CONFLICT);
        }
        return this.habitService.create(req.user.userId, createHabitDto);
    }

    @Get(":habitId/entries")
    getEntries(@Param("habitId", new ParseIntPipe()) habitId: number) {
        // Does this return a habit object inside the entry object?
        // If so, a dto is definitely needed. How and when (where) to
        // convert the entry object into a entry dto?

        // should also check if requester has permission
        return this.entryService.getByHabitId(habitId);
    }
}
