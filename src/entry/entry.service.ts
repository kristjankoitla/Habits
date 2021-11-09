import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateEntryDto } from "./entry.dto";
import { Entry } from "./entry.entity";

@Injectable()
export class EntryService {
    constructor(
        @Inject("ENTRY_REPOSITORY")
        private entryRepository: Repository<Entry>,
    ) {}

    getByHabitId(habitId: number): Promise<Entry[]> {
        return this.entryRepository.find({ where: { id: habitId } });
    }

    create(createEntryDto: CreateEntryDto) {
        // Create entry from dto
        // this.entryRepository.save(entry);
    }

    delete(id: number) {
        this.entryRepository.delete(id);
    }
}
