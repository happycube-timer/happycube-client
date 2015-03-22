'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('solves', function (table) {
    table.increments();
    table.integer('user_id').references('users.id');
    table.integer('ellapsed_time');
    table.string('scramble');
    table.boolean('did_not_finish');
    table.json('skips');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('solves');
};
