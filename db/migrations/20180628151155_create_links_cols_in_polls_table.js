exports.up = function(knex, Promise) {
  return knex.schema.table('polls', function (table) {
    table.string('admin_link');
    table.string('friend_link');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('polls', function (table) {
    table.dropColumn('admin_link');
    table.dropColumn('friend_link');
  })

};
