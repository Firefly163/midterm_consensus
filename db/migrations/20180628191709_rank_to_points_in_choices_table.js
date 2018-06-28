exports.up = function(knex, Promise) {
  return knex.schema.table('choices', function (table) {
     table.renameColumn('rank', 'points');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('choices', function (table) {
   table.renameColumn('points', 'rank');
  })

};
