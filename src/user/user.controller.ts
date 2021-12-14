import { Body, Controller, InternalServerErrorException, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UsernameAlreadyExistsException } from "@src/exception/exceptions";
import { CreateUserDto } from "./user.dto";
import { UserService } from "./user.service";

@ApiTags("users")
@Controller("users")
export class UserController {
    readonly PG_UNIQUE_CONSTRAINT_VIOLATION = "23505";

    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() user: CreateUserDto) {
        try {
            await this.userService.create(user);
        } catch (err) {
            if (err && err.code === this.PG_UNIQUE_CONSTRAINT_VIOLATION) {
                throw new UsernameAlreadyExistsException();
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
