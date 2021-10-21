import { Module } from "@nestjs/common";
import { createConnection } from "typeorm";

const databaseProviders = [
    {
        provide: "DATABASE_CONNECTION",
        useFactory: async () =>
            await createConnection(),
    },
];

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
