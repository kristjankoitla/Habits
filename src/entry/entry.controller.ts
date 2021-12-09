import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GenericGuard } from "@src/auth/guard/generic.guard";
import { CreateEntryDto } from "./entry.dto";
import { EntryService } from "./entry.service";

@ApiTags("entries")
@Controller("habits/:habitId/entries")
export class EntryController {
    constructor(private readonly entryService: EntryService) {}

    @Post()
    @UseGuards(GenericGuard)
    async createEntry(@Param("habitId") habitId: number, @Body() createEntryDto: CreateEntryDto) {
        this.entryService.create(habitId, createEntryDto);
    }

    @Delete(":entryId")
    @UseGuards(GenericGuard)
    deleteEntry(@Param("habitId") habitId: number, @Param("entryId") entryId: number) {
        this.entryService.delete(entryId);
    }

    @Get()
    @UseGuards(GenericGuard)
    async getEntries(@Param("habitId") habitId: number) {
        return this.entryService.getByHabit(habitId);
    }
}
