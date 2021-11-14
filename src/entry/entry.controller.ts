import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseArrayPipe,
    Post,
    Query,
    Request,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "@src/auth/auth.service";
import { JwtAuthGuard } from "@src/auth/guard/jwt-auth.guard";
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

    @Get()
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async getEntries(
        @Request() req,
        @Query("habitId", new ParseArrayPipe({ items: Number })) habitIds: Array<number>,
    ) {
        let isAuthorized = await this.authService.isAuthorizedForHabits(req.user.userId, habitIds);
        if (!isAuthorized) {
            throw new HttpException("Unauthorized for habit(s)", HttpStatus.FORBIDDEN);
        }

        return this.entryService.getByHabitIds(habitIds);
    }
}
