module.exports = knex => (
{
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
  }
});

