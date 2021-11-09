import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateEntryDto } from "./entry.dto";
import { EntryService } from "./entry.service";

@ApiTags("entries")
@Controller("entries")
export class EntryController {
    constructor(private readonly entryService: EntryService) {}

    @Post()
    createEntry(@Body() createEntryDto: CreateEntryDto) {
        this.entryService.create(createEntryDto);
    }

    @Delete(":entryId")
    deleteEntry(@Param("entryId") entryId: number) {
        this.entryService.delete(entryId);
    }
}
