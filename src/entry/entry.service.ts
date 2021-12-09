import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateEntryDto } from "./entry.dto";
import { Entry } from "./entry.entity";

@Injectable()
export class EntryService {
    constructor(
        @Inject("ENTRY_REPOSITORY")
        private entryRepository: Repository<Entry>,
    ) {}

    getByHabit(habitId: number) {
        return this.entryRepository.find({ where: { habitId: habitId } });
    }

    create(habitId: number, createEntryDto: CreateEntryDto) {
        let entry = new Entry();
        entry.date = createEntryDto.date;
        entry.habitId = habitId;
        this.entryRepository.save(entry);
    }

    delete(id: number) {
        this.entryRepository.delete(id);
    }
}
