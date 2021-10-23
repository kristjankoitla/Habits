import { Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Entry } from "./entry.entity";
import { EntryService } from "./entry.service";

@Controller("entries")
export class EntryController {
    constructor(private readonly entryService: EntryService) {}

    @Post()
    createEntry(entry: Entry) {
        this.entryService.create(entry);
    }

    @Delete(":entryId")
    deleteEntry(@Param("entryId") entryId: number) {
        this.entryService.delete(entryId);
    }
}
