import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./user.dto";
import { UserService } from "./user.service";

@ApiTags("users")
@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    createUser(@Body() user: CreateUserDto) {
        this.userService.create(user);
    }
}
