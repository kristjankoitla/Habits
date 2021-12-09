import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateHabitDto } from "./habit.dto";
import { Habit } from "./habit.entity";

@Injectable()
export class HabitService {
    constructor(
        @Inject("HABIT_REPOSITORY")
        private habitRepository: Repository<Habit>,
    ) {}

    getByUserId(userId: number) {
        // todo: fix, does not work atm, returns error
        return this.habitRepository.find({ where: { userId: userId } });
    }

    async checkExists(userId: number, name: string) {
        let count = await this.habitRepository
            .createQueryBuilder("habit")
            .where("habit.userId = :userId AND habit.name = :habitName", {
                userId: userId,
                habitName: name,
            })
            .getCount();
        return count !== 0;
    }

    async getUserId(habitId: number) {
        let habit = await this.habitRepository.findOne({
            where: { id: habitId },
        });
        return habit.userId;
    }

    create(userId: number, createHabitDto: CreateHabitDto) {
        let habit = new Habit();
        habit.name = createHabitDto.name;
        habit.userId = userId;
        this.habitRepository.save(habit);
    }

    delete(habitId: number) {
        this.habitRepository.delete(habitId);
    }
}
