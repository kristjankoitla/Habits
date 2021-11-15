import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import * as session from "express-session";
import * as passport from "passport";
import { AuthModule } from "./auth/auth.module";
import { EntryModule } from "./entry/entry.module";
import { HabitModule } from "./habit/habit.module";
import { UserModule } from "./user/user.module";
import { secret } from "session-secret.json";

@Module({
    imports: [AuthModule, UserModule, HabitModule, EntryModule],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                session({
                    // todo: store: new (RedisStore(session))({ client: this.redis, logErrors: true }),
                    saveUninitialized: false,
                    secret: secret,
                    resave: false,
                    cookie: {
                        sameSite: true,
                        httpOnly: false,
                        maxAge: 60000,
                    },
                }),
                passport.initialize(),
                passport.session(),
            )
            .forRoutes("*");
    }
}
