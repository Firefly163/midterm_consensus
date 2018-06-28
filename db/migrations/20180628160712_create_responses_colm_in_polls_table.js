exports.up = function(knex, Promise) {
  return knex.schema.table('polls', function (table) {
    table.integer('responses');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('polls', function (table) {
   table.dropColumn('responses');
  })

};
