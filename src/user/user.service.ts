import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { hashSync } from "bcrypt";
import { CreateUserDto } from "./user.dto";

@Injectable()
export class UserService {
    constructor(
        @Inject("USER_REPOSITORY")
        private userRepository: Repository<User>,
    ) {}

    getByUsername(username: string) {
        return this.userRepository.findOne({ where: { username: username } });
    }

    create(createUserDto: CreateUserDto) {
        // todo: handle unique duplicate errors/cases somehow
        let user = new User();
        user.name = createUserDto.name;
        user.username = createUserDto.username;
        user.password = hashSync(createUserDto.password, 10);

        this.userRepository.save(user);
    }
}
