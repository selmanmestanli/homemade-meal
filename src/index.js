const User = require("./user");
const Photo = require("./photo");
const Recipe = require("./recipe");
const Comment = require("./comment");
const Reply = require("./reply");

// ------- Create Users -------

const selman = new User("Selman", "selman@gmail.com");
const neslihan = new User("Neslihan", "neslihan@gmail.com");
const armagan = new User("Armagan", "armagan@gmail.com");



// ------- Add photo and like photo functions -------

const photoMucver = new Photo("mucverPhoto.jpg");
selman.addPhoto(photoMucver);
//console.log(selman)
neslihan.likePhoto(photoMucver);
//console.log(neslihan.likedPhotos[0])

// ------- Add recipe and like recipe functions -------

const recipeMucver = new Recipe("Mucver");
const recipePizza = new Recipe("Pizza Luna");
selman.addRecipe(recipeMucver);
neslihan.addRecipe(recipePizza);
armagan.likeRecipe(recipeMucver);
armagan.likeRecipe(recipePizza);
//neslihan.likeRecipe(recipeMucver)
console.log(selman.recipes)
//console.log(armagan.likedRecipes)

// ------- Add Comment, like comment and reply comment functions -------

const comment1 = new Comment("Homemade Veggie Pizza!");
selman.addComment(comment1);

const comment2 = new Comment("Homemade mucver!");
selman.addComment(comment2);

const reply1 = new Reply("This looks so yummy!");
neslihan.replyComment(comment1, reply1);
const reply2 = new Reply("It looks amazing!");
neslihan.replyComment(comment2, reply2);
neslihan.likeComment(comment1);
selman.likeReply(reply2);
armagan.likeReply(reply2);
//console.log(neslihan.replies)
//console.log(armagan.replies)
//console.log(armagan.replies,neslihan.replies,selman.comments)
//console.log(neslihan.likedComments[0].comment)
//console.log(neslihan.repliedComments[0].comment)
//console.log(selman.comments[0].repliedBy)
//console.log(neslihan.likedComments);
