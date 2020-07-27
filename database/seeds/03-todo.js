
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todo').del()
    .then(function () {
      // Inserts seed entries
      return knex('todo').insert([
        {id: 1, todo: 'Eat some food', list_id: 1},
        {id: 2, todo: 'Get to work', list_id: 1},
        {id: 3, todo: 'Go to bed', list_id: 1}
      ]);
    });
};
