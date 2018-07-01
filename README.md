# Node Skeleton

## Consensus 
Making decisions is hard. Why not step back and let someone else do it? Consensus lets you create polls on any subject and send links to whoever you want. Friends anonymously rank their choices, and you get to see the aggregate results. Easy as pie!

## File Setup
1. This app uses Nodemailer to send emails via Gmail. You will need to create a `secrets.js` file with the following setup:

`const emailPassword = "<YOUR EMAIL PASSWORD>";
const userEmail     = "<THE GMAIL ADDRESS YOU WILL SEND FROM>";
module.exports = {
  emailPassword,
  userEmail
}`

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
6. Run the seed: `npm run knex seed:run`
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Using Consensus

Register and log in to use the app. Your polls will be displayed on the "My Polls" page. 


Each poll is a link to an admin page where you can get details such as the number of responses and the curret results. 


Create a poll by filling in the fields on the Create page. You will receive an email once it has been created. You'll also get an email notifying you every time someone takes your poll. 


Friends drag and drop their choices to rank them. Their answers are anonymous. 

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- bcrypt 2.0.0
- body-parser 1.15.2 or above
- cookie-session 1.3.2 or above
- dotenv 2.0.0 or above
- ejs 2.4.1 or above
- express 4.13.4 or above
- knex 0.11.7 or above
- knex-logger 0.1.0 or above
- mailgun-js 0.19.0 or above
- morgan1.7.0 or above
- node-sass-middleware 0.9.8 or above
- nodemailer 4.6.7 or above
- pg 6.0.2 or above
