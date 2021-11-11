import {
    Body,
    Controller,
    Delete,
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
import { AuthService } from "src/auth/auth.service";
import { JwtAuthGuard } from "src/auth/strategy/jwt-auth.guard";
import { CreateEntryDto } from "./entry.dto";
import { EntryService } from "./entry.service";

@ApiTags("entries")
@Controller("entries")
export class EntryController {
    constructor(
        private readonly authService: AuthService,
        private readonly entryService: EntryService,
    ) {}

    @Post()
    createEntry(@Body() createEntryDto: CreateEntryDto) {
        this.entryService.create(createEntryDto);
    }

    @Delete(":entryId")
    deleteEntry(@Param("entryId") entryId: number) {
        this.entryService.delete(entryId);
    }

    @Get(":habitId")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async getEntries(@Request() req, @Param("habitId", new ParseIntPipe()) habitId: number) {
        let isAuthorized = await this.authService.isAuthorizedForHabit(req.user.userId, habitId);
        if (!isAuthorized) {
            throw new HttpException("Unauthorized for habit", HttpStatus.FORBIDDEN);
        }

        return this.entryService.getByHabitId(habitId);
    }
}
