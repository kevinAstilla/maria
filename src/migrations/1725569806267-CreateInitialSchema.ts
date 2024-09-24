import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialSchema1725569806267 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" (...)`);
        await queryRunner.query(`CREATE TABLE "recipe" (...)`);
        await queryRunner.query(`CREATE TABLE "ingredient" (...)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ingredient"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
