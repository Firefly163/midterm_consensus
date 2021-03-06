module.exports = knex => ({

// Users table functions
  getUserId: (email) => {
    return knex.first("id")
    .from("users")
    .where("email", "=", email)
    .then(result => result.id);
  },

  getUserName: (userId) => {
    return knex.first("name")
    .from("users")
    .where("id", "=", userId)
    .then(result => result.name);
  },

  getAllUserIds: () => {
    return knex.select("id")
    .from("users")
    .then(result => {
      let ids = [];
      result.forEach(el => ids.push(el.id));
      return ids;
    });
  },

  getUserPassword: (email) => {
    return knex.first("password")
    .from("users")
    .where("email", "=", email)
    .then(result => result.password);
  },

  insertNewUser: (userName, userEmail, userPassword) => {
    return knex("users")
    .insert({
      name:     userName,
      email:    userEmail,
      password: userPassword
      })
      .then();
  },

  getUsers: () => {
    return knex.select('*')
    .from("users")
    .then(result => result)
  },

//Polls table functions
  getAllFriendLinks: () => {
    return knex.select("friend_link")
    .from("polls")
    .then(result => {
      let friendLinks = [];
      result.forEach(el => friendLinks.push(el.friend_link));
      return friendLinks;
    });
  },

  getPollId: (pollName) => {
    return knex.first("id")
    .from("polls")
    .where("poll_name", "=", pollName)
    .then(result => result.id);
  },

  getAdminLink: (friendLink) => {
    return knex.first("admin_link")
    .from("polls")
    .where("friend_link", "=", friendLink)
    .then(result => result.admin_link);
  },

  getAdminLinkFromId: (pollId) => {
    return knex.first("admin_link")
    .from("polls")
    .where("id", "=", pollId)
    .then(result => result.admin_link);
  },

  getFriendLink: (adminLink) => {
    return knex.first("friend_link")
    .from("polls")
    .where("admin_link", "=", adminLink)
    .then(result => result.friend_link);
  },

  getPollName: (pollid) => {
    return knex.first("poll_name")
    .from("polls")
    .where('id', '=', pollid)
    .then(result => result.poll_name);
  },

  getAllAdminLinks: () => {
    return knex.select("admin_link")
    .from("polls")
    .then(result => {
      let adminLinks = [];
      result.forEach(el => adminLinks.push(el.admin_link));
      return adminLinks;
    });
  },

  getPollId: (friend_link) => {
    return knex.first("id")
    .from("polls")
    .where('friend_link', '=', friend_link)
    .then(result => result.id);
  },

  getPollDescription: (pollid) => {
    return knex.first("description")
    .from("polls")
    .where('id', '=', pollid)
    .then(result => result.description);
  },

  getUserPolls: (userId) => {
    return knex()
    .select('poll_name','id', 'admin_link')
    .from('polls')
    .where('user_id','=', userId)
    .then(result => result);
  },

  getCurrentResponses: (poll_id) => {
    return knex.first("responses")
    .from("polls")
    .where("id", "=", poll_id)
    .then(result => result.responses);
  },

  getCreatorEmail: (poll_id) => {
    return knex('polls')
    .join('users', 'polls.user_id', '=', 'users.id'  )
    .first("email")
    .where("polls.id", "=", poll_id)
    .then(result => result.email)
  },

  updateResponses: (poll_id, newRes) => {
    knex("polls")
    .where('id', '=', poll_id)
    .update({responses: newRes})
    .then();
  },

  getPollByAdmLink: (adminLink) => {
    return knex()
    .select('*')
    .from('polls')
    .where('admin_link', '=', adminLink)
    .then(result => result[0]);
  },

  //Choices table functions
  deletePoll: (pollId) => {
    knex('choices')
      .where('poll_id','=', pollId)
      .del()
      .then(() => knex('polls')
                      .where('id', '=', pollId)
                      .del()
                      )
  },

  getCurrentPoints: (poll_id) => {
    return knex.select("id","points")
    .from("choices")
    .where('poll_id', '=', poll_id)
    .then(result => result);
  },

  getChoicesArrS: (pollsIds) => {
    return knex.select("*")
    .from("choices")
    .whereIn('poll_id', pollsIds)
    .then(result => result);
  },

  updatePoints: (choice_id, newPoints) => {
    knex("choices")
    .where('id', '=', choice_id)
    .update({points: newPoints})
    .then();
  },

  getChoicesArr: (pollid) => {
    return knex.select("*")
    .from("choices")
    .where('poll_id', '=', pollid)
    .then(result => result);
  },

});

