import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1767177849060 implements MigrationInterface {
    name = 'Migration1767177849060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subscribers" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "email" character varying NOT NULL, "verifiedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_1a7163c08f0e57bd1c9821508b1" UNIQUE ("email"), CONSTRAINT "PK_55e848758af97c671faa1bbe7ff" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1a7163c08f0e57bd1c9821508b" ON "subscribers" ("email") `);
        await queryRunner.query(`CREATE TYPE "public"."subscriptions_newsletter_enum" AS ENUM('digital-advertiser', 'solopreneur', 'leadgen-specialist')`);
        await queryRunner.query(`CREATE TABLE "subscriptions" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "newsletter" "public"."subscriptions_newsletter_enum" NOT NULL, "subscriberUuid" uuid NOT NULL, CONSTRAINT "PK_eb660c4a66c2c5d344553401002" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d850dd21f9d083eb3e67be8014" ON "subscriptions" ("subscriberUuid", "newsletter") `);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_0dc44a8a7c0763a1ff2910fb18b" FOREIGN KEY ("subscriberUuid") REFERENCES "subscribers"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_0dc44a8a7c0763a1ff2910fb18b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d850dd21f9d083eb3e67be8014"`);
        await queryRunner.query(`DROP TABLE "subscriptions"`);
        await queryRunner.query(`DROP TYPE "public"."subscriptions_newsletter_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1a7163c08f0e57bd1c9821508b"`);
        await queryRunner.query(`DROP TABLE "subscribers"`);
    }

}
