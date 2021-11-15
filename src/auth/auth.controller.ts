import { Body, Controller, HttpCode, HttpStatus, Post, Session, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./auth.dto";
import { LocalAuthGuard } from "./guard/local-auth.guard";
import { LoggedInGuard } from "./guard/logged-in.guard";

@ApiTags("authentication")
@Controller()
export class AuthController {
    constructor() {}

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post("auth/login")
    async login(@Session() session, @Body() user: LoginDto) {
        return session;
    }

    @UseGuards(LoggedInGuard)
    @Post("auth/logout")
    async logout(@Session() session) {
        return session.destroy();
    }
}
