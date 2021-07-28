import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransactions1627231177470 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(
        new Table({
          name: 'transactions',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'account_id',
              type: 'uuid',
              isNullable: false,
            },
            {
              name: 'value',
              type: 'float',
              isNullable: false,
            },
            {
              name: 'type',
              type: 'enum',
              enum: ['withdraw', 'deposit'],
              isNullable: false,
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
              name: 'TransactionAccount',
              referencedTableName: 'accounts',
              referencedColumnNames: ['id'],
              columnNames: ['account_id'],
              onDelete: 'SET NULL',
              onUpdate: 'CASCADE',
            },
          ],
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropTable('transactions');
    }

}
