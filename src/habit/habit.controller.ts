import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/strategy/jwt-auth.guard";
import { CreateHabitDto } from "./habit.dto";
import { HabitService } from "./habit.service";

@ApiTags("habits")
@Controller("habits")
export class HabitController {
    constructor(private readonly habitService: HabitService) {}

    @Get()
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    getHabits(@Request() req) {
        return this.habitService.getByUserId(req.user.userId);
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async createHabit(@Request() req, @Body() createHabitDto: CreateHabitDto) {
        if (await this.habitService.checkExists(req.user.userId, createHabitDto.name)) {
            throw new HttpException("Duplicate habit", HttpStatus.CONFLICT);
        }
        return this.habitService.create(req.user.userId, createHabitDto);
    }
}
