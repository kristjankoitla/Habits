import { Module } from "@nestjs/common";
import { createConnection, getConnectionOptions } from "typeorm";

const databaseProviders = [
    {
        provide: "DATABASE_CONNECTION",
        useFactory: async () => {
            // When running Jest, NODE_ENV is set to "test", otherwise it's left undefined.
            // getConnectionOptions(undefined) defaults to "default".
            // Both of these connections are defined in ormconfig.json.
            let options = await getConnectionOptions(process.env.NODE_ENV);
            return await createConnection(options);
        },
    },
];

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
