import { Body, Controller, Get, Post } from "@nestjs/common";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getUsers() {
        return this.userService.getAll();
    }

    @Post()
    createUser(@Body() user: User) {
        this.userService.create(user);
    }
}
