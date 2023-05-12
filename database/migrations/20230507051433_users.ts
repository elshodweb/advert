import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema
    .raw('CREATE extension if not exists "uuid-ossp"')
    .createTable('adverts', (table) => {
      table
        .uuid('advert_id')
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.bigint('advert_buy').notNullable();
      table.bigint('advert_sell').notNullable();
      table.string('advert_url').notNullable();
      table.string('advert_picture').notNullable();
      table.boolean('advert_is_active').defaultTo(true);
      table
        .timestamp('advert_created_at', { useTz: false })
        .defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('adverts');
}
