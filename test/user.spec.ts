import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "@src/app.module";
import * as request from "supertest";
import { Connection, getConnection } from "typeorm";

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
        connection = getConnection();
    });

    afterAll(async () => {
        await connection.close();
        await app.close();
    });

    it("Authenticates a user and includes a jwt token in the response", async () => {
        const response = await request(app.getHttpServer())
            .post("/auth/login")
            .send({ username: "testUsername", password: "testPassword" })
            .expect(200);

        jwtToken = response.body.access_token;
        expect(jwtToken).toMatch(JWT_REGEX);
    });
});
