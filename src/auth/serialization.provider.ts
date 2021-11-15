import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "@src/user/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthSerializer extends PassportSerializer {
    constructor(
        @Inject("USER_REPOSITORY")
        private userRepository: Repository<User>,
    ) {
        super();
    }

    serializeUser(user, done) {
        done(null, user.id);
    }

    deserializeUser(id, done) {
        // todo: error handling here when no user found. Can that happen?
        const user = this.userRepository.findOne({
            where: { id: id },
        });
        done(null, user);
    }
}
