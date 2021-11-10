import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateHabit1636501201785 implements MigrationInterface {
    name = 'UpdateHabit1636501201785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "habit" ADD CONSTRAINT "UQ_NAME_PER_USER" UNIQUE ("name", "userId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "habit" DROP CONSTRAINT "UQ_NAME_PER_USER"`);
    }

}
