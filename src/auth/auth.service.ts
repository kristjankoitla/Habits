import { Inject, Injectable } from "@nestjs/common";
import { Habit } from "@src/habit/habit.entity";
import { User } from "@src/user/user.entity";
import { compareSync } from "bcrypt";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @Inject("USER_REPOSITORY")
        private userRepository: Repository<User>,
        @Inject("HABIT_REPOSITORY")
        private habitRepository: Repository<Habit>,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userRepository.findOne({
            where: { username: username },
        });

        if (user && compareSync(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async isAuthorizedForHabits(userId: number, habitIds: number[]) {
        let habits = await this.habitRepository.findByIds(habitIds);
        for (const habit of habits) {
            if (habit?.userId !== userId) {
                return false;
            }
        }
        return true;
    }
}
