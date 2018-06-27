exports.up = function(knex, Promise) {
  return knex.schema.createTable('polls', function (table) {
    table.increments();
    table.integer('user_id').references('users.id');
    table.string('poll_name');
    table.string('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('polls');
};
