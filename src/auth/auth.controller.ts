import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./auth.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guard/local-auth.guard";

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiTags("authentication")
    @ApiBody({ type: LoginDto })
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post("auth/login")
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
