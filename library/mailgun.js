
const api_key = 'e7ed6624e722cbcaa6ab25d9521ed0d0-e44cc7c1-fc9f2c72';
const domain = 'sandbox515189107de443848456b7c953829456.none';
const mailgun     = require("mailgun-js")({apiKey: api_key, domain: domain});


var data = {
  from: "Consensus <emilyhfdong@gmail.com>",
  to: "emilyhfdong@gmail.com",
  subject: "Someone took your poll!",
  text: "A user has taken your poll. Log in to http://localhost:8080/ to see the results!"
};

module.exports = {
  mailgunData: data
}
// gmail option  -
