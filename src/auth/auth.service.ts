import { Inject, Injectable } from "@nestjs/common";
import { User } from "@src/user/user.entity";
import { compareSync } from "bcrypt";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @Inject("USER_REPOSITORY")
        private userRepository: Repository<User>,
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
}
