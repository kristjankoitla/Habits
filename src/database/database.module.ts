import { Module } from "@nestjs/common";
import { createConnection } from "typeorm";
const { config } = require("../../database.json");

const databaseProviders = [
    {
        provide: "DATABASE_CONNECTION",
        useFactory: async () =>
            await createConnection({
                ...config,
                entities: [__dirname + "/../**/*.entity{.ts,.js}"],
            }),
    },
];

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
