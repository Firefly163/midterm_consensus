exports.seed = function(knex, Promise) {
  function deleteChoices() {
    return knex('choices').del()
  }
  function deletePolls() {
    return knex('polls').del()
  }
  function deleteUsers() {
    return knex('users').del()
  }


  function insertUsers() {
    return knex('users').insert([
      {name: 'Alice', email: 'alice@example.com', password: 'hi'},
      {name: 'Bob', email: 'bob@example.com', password: 'hello'},
      {name: 'Charlie', email: 'charlie@example.com', password: 'hey'}
    ]).returning('*');
  }

  function insertPolls(users) {
    return knex('polls').insert([
      {user_id: users[0].id, poll_name: 'To Eat?', description: 'choose what to eat'},
      {user_id: users[0].id, poll_name: 'To Drink?', description: 'choose what to drink'},
      {user_id: users[1].id, poll_name: 'To Play?', description: 'choose what to play'},
      {user_id: users[2].id, poll_name: 'To See?', description: 'choose what to see'},
    ]).returning('*');
  }

  function insertChoices(polls) {
    return knex('choices').insert([
      {poll_id: polls[0].id, choice: 'Sushi', rank: 0},
      {poll_id: polls[0].id, choice: 'Pizza', rank: 0},
      {poll_id: polls[1].id, choice: 'Water', rank: 0},
      {poll_id: polls[1].id, choice: 'Juice', rank: 0},
      {poll_id: polls[2].id, choice: 'Tag', rank: 0},
      {poll_id: polls[2].id, choice: 'Board games', rank: 0},
      {poll_id: polls[3].id, choice: 'Movie', rank: 0},
      {poll_id: polls[3].id, choice: 'Musical', rank: 0},
    ]);
  }


  return deleteChoices()
    .then(deletePolls)
    .then(deleteUsers)
    .then(insertUsers)
    .then(users => insertPolls(users))
    .then(polls => insertChoices(polls))



};
