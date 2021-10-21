import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @Inject("USER_REPOSITORY")
        private userRepository: Repository<User>,
    ) {}

    getAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    create(user: User) {
        this.userRepository.save(user);
    }
}
