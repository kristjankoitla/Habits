import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compareSync } from "bcrypt";
import { Habit } from "src/habit/habit.entity";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @Inject("USER_REPOSITORY")
        private userRepository: Repository<User>,
        @Inject("HABIT_REPOSITORY")
        private habitRepository: Repository<Habit>,
        private jwtService: JwtService,
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

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
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
