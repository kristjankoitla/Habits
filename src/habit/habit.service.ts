import { Injectable, Inject } from "@nestjs/common";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { Habit, HabitRequest } from "./habit.entity";

@Injectable()
export class HabitService {
    constructor(
        @Inject("HABIT_REPOSITORY")
        private habitRepository: Repository<Habit>,
        @Inject("USER_REPOSITORY")
        private userRepository: Repository<User>,
    ) {}

    getAll(): Promise<Habit[]> {
        return this.habitRepository.find();
    }

    create(habitRequest: HabitRequest) {     
        return this.userRepository
            .findOne({
                where: { id: habitRequest.userId },
            })
            .then((user) => {
                let habit = new Habit();
                habit.name = habitRequest.name;
                habit.user = user;
                return habit;
            })
            .then(habit => {
                return this.habitRepository.save(habit);
            })
            .then(habit => habit.id);
    }
}
