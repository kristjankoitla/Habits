import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    ParseArrayPipe,
    Post,
    Query,
    Session,
    UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "@src/auth/auth.service";
import { LoggedInGuard } from "@src/auth/guard/logged-in.guard";
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
    @UseGuards(LoggedInGuard)
    async createEntry(@Session() session, @Body() createEntryDto: CreateEntryDto) {
        let isAuthorized = await this.authService.isAuthorizedForHabits(session.passport.user, [
            createEntryDto.habitId,
        ]);
        if (!isAuthorized) {
            throw new HttpException("Unauthorized for habit", HttpStatus.FORBIDDEN);
        }

        this.entryService.create(createEntryDto);
    }

    // todo: figure out how to reasonably get the user of entry
    // @Delete(":entryId")
    // deleteEntry(@Param("entryId") entryId: number) {
    //     this.entryService.delete(entryId);
    // }

    @Get()
    @UseGuards(LoggedInGuard)
    async getEntries(
        @Session() session,
        @Query("habitId", new ParseArrayPipe({ items: Number })) habitIds: Array<number>,
    ) {
        let isAuthorized = await this.authService.isAuthorizedForHabits(
            session.passport.user,
            habitIds,
        );
        if (!isAuthorized) {
            throw new HttpException("Unauthorized for habit(s)", HttpStatus.FORBIDDEN);
        }

        return this.entryService.getByHabitIds(habitIds);
    }
}
