import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Session,
    UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoggedInGuard } from "@src/auth/guard/logged-in.guard";
import { CreateHabitDto } from "./habit.dto";
import { HabitService } from "./habit.service";

@ApiTags("habits")
@Controller("habits")
export class HabitController {
    constructor(private readonly habitService: HabitService) {}

    @Get()
    @UseGuards(LoggedInGuard)
    getHabits(@Session() session) {
        return this.habitService.getByUserId(session.passport.user);
    }

    @Post()
    @UseGuards(LoggedInGuard)
    async createHabit(@Session() session, @Body() createHabitDto: CreateHabitDto) {
        if (await this.habitService.checkExists(session.passport.user, createHabitDto.name)) {
            throw new HttpException("Duplicate habit", HttpStatus.CONFLICT);
        }
        return this.habitService.create(session.passport.user, createHabitDto);
    }
}
