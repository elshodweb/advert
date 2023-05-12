import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('todo', (table) => {
      table.uuid('todo_id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      table.string('todo_title', 32).notNullable();
      table.string('todo_text', 2048).notNullable();
      table
        .enum('todo_status', ['process', 'success', 'fail'])
        .defaultTo('process')
        .notNullable();
      table
        .timestamp('todo_created_at', { useTz: false })
        .defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {}
