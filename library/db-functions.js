module.exports = knex => ({

  getUserId: (email) => {
    return knex.first("id").from("users").where("email", "=", email)
  .then(result => result.id);
  },

  getUserPassword: (email) => {
    return knex.first("password").from("users").where("email", "=", email)
  .then(result => result.password);
  },

  insertNewUser: (userName, userEmail, userPassword, callback) => {
    return knex("users").insert({
    name: userName,
    email: userEmail,
    password: userPassword
    })
  .then(rows => {
      callback();
    })
  },

  getChoicesArr: (pollid) => {
    return knex.select("*")
      .from("choices")
      .where('poll_id', '=', pollid)
      .then(result => result);
  },

  getPollName: (pollid) => {
    return knex.first("poll_name").from("polls").where('id', '=', pollid)
    .then(result => result.poll_name);
  },

  getPollDescription: (pollid) => {
    return knex.first("description").from("polls").where('id', '=', pollid)
    .then(result => result.description);
  },

  getUserPolls: (userId) => {
    return knex()
      .select('poll_name','id')
      .from('polls')
      .where('user_id','=', userId)
      .then(result => result)
  },

});

