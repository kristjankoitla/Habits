import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateEntry1635022166406 implements MigrationInterface {
    name = 'CreateEntry1635022166406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "entry" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "habitId" integer NOT NULL, CONSTRAINT "PK_a58c675c4c129a8e0f63d3676d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_50444392d7894ea79960c4f9755" FOREIGN KEY ("habitId") REFERENCES "habit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_50444392d7894ea79960c4f9755"`);
        await queryRunner.query(`DROP TABLE "entry"`);
    }

}
