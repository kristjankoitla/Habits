import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateHabit1634939301912 implements MigrationInterface {
    name = 'CreateHabit1634939301912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "habit" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_71654d5d0512043db43bac9abfc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "habit" ADD CONSTRAINT "FK_999000e9ce7a69128f471f0a3f9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "habit" DROP CONSTRAINT "FK_999000e9ce7a69128f471f0a3f9"`);
        await queryRunner.query(`DROP TABLE "habit"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
