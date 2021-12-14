import { Inject, Injectable, MethodNotAllowedException } from "@nestjs/common";
import { hashSync } from "bcrypt";
import { Repository } from "typeorm";
import { CreateUserDto } from "./user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @Inject("USER_REPOSITORY")
        private userRepository: Repository<User>,
    ) {}

    getByUsername(username: string) {
        return this.userRepository.findOne({ where: { username: username } });
    }

    async create(createUserDto: CreateUserDto) {
        let user = new User();
        user.name = createUserDto.name;
        user.username = createUserDto.username;
        user.password = hashSync(createUserDto.password, 10);

        await this.userRepository.save(user);
    }
}
