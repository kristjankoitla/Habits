import { Module } from "@nestjs/common";
import { AuthModule } from "@src/auth/auth.module";
import { DatabaseModule } from "@src/database/database.module";
import { Connection } from "typeorm";
import { EntryController } from "./entry.controller";
import { Entry } from "./entry.entity";
import { EntryService } from "./entry.service";

const entryProviders = [
    {
        provide: "ENTRY_REPOSITORY",
        useFactory: (connection: Connection) => connection.getRepository(Entry),
        inject: ["DATABASE_CONNECTION"],
    },
];

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [EntryController],
    providers: [...entryProviders, EntryService],
})
export class EntryModule {}
