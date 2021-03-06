import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "@src/app.module";
import * as request from "supertest";
import { Connection } from "typeorm";

describe("User", () => {
    const JWT_REGEX = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

    let app: INestApplication;
    let connection: Connection;
    let jwtToken: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        connection = app.get("DATABASE_CONNECTION");
    });

    afterAll(async () => {
        await connection.close();
        await app.close();
    });

    it("Should pass", async () => {
        expect(true);
    });
});
