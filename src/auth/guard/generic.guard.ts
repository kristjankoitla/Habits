import { CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import { Habit } from "@src/habit/habit.entity";
import { Repository } from "typeorm";
import { LoggedInGuard } from "./logged-in.guard";

export class GenericGuard extends LoggedInGuard implements CanActivate {
    constructor(
        @Inject("HABIT_REPOSITORY")
        private habitRepository: Repository<Habit>,
    ) {
        super();
    }

    async canActivate(context: ExecutionContext) {
        if (!super.canActivate(context)) {
            return false;
        }

        const request = context.switchToHttp().getRequest();

        const userId = request.session.passport.user;

        const params = request.params;
        const habitId = params.habitId;

        if (habitId) {
            if (!(await this.isUserAuthroizedForHabit(userId, habitId))) {
                return false;
            }
        }

        return true;
    }

    async isUserAuthroizedForHabit(userId: number, habitId: number) {
        let habit = await this.habitRepository.findOne(habitId);
        return habit?.userId === userId;
    }
}
