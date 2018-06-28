module.exports = knex => ({

  getUserId: (email) => {
    return knex.first("id").from("users").where('email', '=', email)
    .then(result => result.id);
  },

  insertNewUser: (userName, userEmail, userPassword, callback) => {
    return knex('users').insert({
    name: userName,
    email: userEmail,
    password: userPassword
    })
    .then(rows => {
        console.log("hi there")
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

});

