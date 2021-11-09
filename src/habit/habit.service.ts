import { Injectable, Inject } from "@nestjs/common";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { CreateHabitDto } from "./habit.dto";
import { Habit } from "./habit.entity";

@Injectable()
export class HabitService {
    constructor(
        @Inject("HABIT_REPOSITORY")
        private habitRepository: Repository<Habit>,
        @Inject("USER_REPOSITORY")
        private userRepository: Repository<User>,
    ) {}

    getByUserId(userId: number) {
        // todo fix
        return this.habitRepository.find({ where: { userId: userId } });
    }

    create(createHabitDto: CreateHabitDto) {
        return this.userRepository
            .findOne({
                // there probably shouldn't be a db query if we already know the id of userID
                where: { id: createHabitDto.userId },
            })
            .then((user) => {
                let habit = new Habit();
                habit.name = createHabitDto.name;
                habit.user = user;
                return habit;
            })
            .then((habit) => {
                return this.habitRepository.save(habit);
            })
            .then((habit) => habit.id);
    }
}
