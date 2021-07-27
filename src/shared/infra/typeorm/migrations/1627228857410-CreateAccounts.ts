import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAccounts1627228857410 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'accounts',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'user_id',
              type: 'uuid',
              isNullable: false,
            },
            {
              name: 'account_type',
              type: 'enum',
              enum: ['savings_account', 'checking_account', 'hybrid_account'],
              isNullable: false,
            },
            {
              name: 'balance',
              type: 'float',
              isNullable: false,
            },
            {
              name: 'withdraw_limit',
              type: 'float',
              isNullable: false,
            },
            {
              name: 'flag_active',
              type: 'boolean',
              isNullable: false,
              default: true,
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'deleted_at',
              type: 'timestamp',
              isNullable: true,
            }
          ],
          foreignKeys: [
            {
              name: 'AccountUser',
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
              columnNames: ['user_id'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            },
          ],
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('accounts');
    }

}
