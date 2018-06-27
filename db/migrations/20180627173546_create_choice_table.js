exports.up = function(knex, Promise) {
  return knex.schema.createTable('choices', function (table) {
    table.increments();
    table.integer('poll_id').references('polls.id');
    table.string('choice');
    table.integer('rank');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('choices');
};
