module.exports = knex => (
{
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
  }
});

