import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./auth.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./strategy/local-auth.guard";

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiTags("authentication")
    @UseGuards(LocalAuthGuard)
    @ApiBody({ type: LoginDto })
    @Post("auth/login")
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
