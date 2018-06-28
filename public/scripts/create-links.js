function makeRandomString() {
  let randomArray = []
  let choices ="qwertyuioplkjhgfdsazxcvbnm1234567890"
  for (let i = 0; i < 6; i ++) {
    let randomchoice = Math.floor(Math.random() * 37);
    randomArray.push(choices[randomchoice]);
    randomString = randomArray.join("");
  }
  return randomString;
}


$(document).ready(function() {

$(".create-button").on("click", function() {
  const adminLink = makeRandomString();
  const friendLink =  makeRandomString();
  console.log("admin", adminLink, "friend", friendLink);
  knex('polls').insert({admin_link: $(adminLink), friendLink: $(friendLink)})
});



});
