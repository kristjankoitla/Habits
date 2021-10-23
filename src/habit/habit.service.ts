import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { Habit } from "./habit.entity";

@Injectable()
export class HabitService {
    constructor(
        @Inject("HABIT_REPOSITORY")
        private habitRepository: Repository<Habit>,
    ) {}

    getAll(): Promise<Habit[]> {
        return this.habitRepository.find();
    }

    create(habit: Habit) {
        this.habitRepository.save(habit);
    }
}
