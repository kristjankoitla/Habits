import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { hashSync } from "bcrypt"


@Injectable()
export class UserService {
    constructor(
        @Inject("USER_REPOSITORY")
        private userRepository: Repository<User>,
    ) {}

    getAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    getByUsername(username: string) {
        // todo findOne currently finds by field which does not have to be unique
        return this.userRepository.findOne({ where: { username: username } });
    }

    getById(id: number) {
        return this.userRepository.findOne({ where: { id: id }});
    }

    create(user: User) {
        console.log(user);
        user.password = hashSync(user.password, 10);
        this.userRepository.save(user);
    }
}
