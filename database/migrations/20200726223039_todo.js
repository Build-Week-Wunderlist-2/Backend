
exports.up = function(knex) {
    return knex.schema
    .createTable('users', tbl => {
        tbl.increments('id');
        tbl.string('username')
            .notNullable()
            .unique()
        tbl.string('password')
            .notNullable()
    })

    .createTable('lists', tbl => {
        tbl.increments('id')
        tbl.string('listname')
            .notNullable()
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })

    .createTable('todo', tbl => {
        tbl.increments('id')
        tbl.string('todo')
            .notNullable()
        tbl.integer('list_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('lists')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        tbl.boolean('completed')
            .defaultTo('false')
    })

};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('todo')
        .dropTableIfExists('lists')
        .dropTableIfExists('users')
  };
