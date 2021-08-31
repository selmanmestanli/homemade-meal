class Person {
    constructor(name, eMail) {
        this.name = name
        this.eMail = eMail
        this.photos = []
        this.recipes = []
        this.comments = []
        this.replies = []
        this.likedPhotos = []
        this.likedRecipes = []
        this.likedComments = []
        this.repliedComments = []
        this.likedReplies = []
    }

    addRecipe(recipe) {
        return this.recipes.push(recipe)
    }

    addPhoto(photo) {
        return this.photos.push(photo)
    }

    addComment(comment) {
        return this.comments.push(comment)
    }

    replyComment(comment, reply) {
        comment.repliedBy.push(this)
        this.repliedComments.push(comment)
        this.replies.push(reply) 
    }

    likePhoto(photo) {
        photo.likedBy.push(this)
        this.likedPhotos.push(photo)
    }

    likeRecipe(recipe) {
        recipe.likedBy.push(this)
        this.likedRecipes.push(recipe)
    }

    likeComment(comment) {
        comment.likedBy.push(this)
        this.likedComments.push(comment)
    }
    likeReply(reply) {
        reply.likedBy.push(this)
        this.likedReplies.push(reply)
    }

}

function signUp(name, eMail) {
    return new Person(name, eMail)
}

class Photo {
    constructor(photoname) {
        this.photoname = photoname
        this.likedBy = []
    }
}

class Recipe {
    constructor(recipename) {
        this.recipename = recipename
        this.likedBy = []
    }
}

class Comment {
    constructor(comment) {
        this.comment = comment
        this.likedBy = []
        this.repliedBy = []
    }
}
 
class Reply {
    constructor(reply) {
        this.reply = reply
        this.likedBy = []
    }
}

//Check signUp function:

const selman = signUp('Selman', 'selman@gmail.com')
const neslihan = signUp('Neslihan', 'neslihan@gmail.com')
const armagan = signUp('Armagan', 'armagan@gmail.com')
//console.log(selman,neslihan,armagan)


//Check add photo and like photo functions:

const photoMucver = new Photo('mucverPhoto.jpg')
selman.addPhoto(photoMucver)
//console.log(selman)
neslihan.likePhoto(photoMucver)
//console.log(selman, neslihan)
//console.log(neslihan.likedPhotos[0])


// Check add recipe and like recipe functions:

const recipeMucver = new Recipe('Mucver')
const recipePizza = new Recipe('Pizza Luna')
selman.addRecipe(recipeMucver)
neslihan.addRecipe(recipePizza)
armagan.likeRecipe(recipeMucver)
armagan.likeRecipe(recipePizza)
//neslihan.likeRecipe(recipeMucver)
//console.log(selman,armagan,neslihan)
//console.log(selman.recipes[0].likedBy[0])
//console.log(armagan.likedRecipes)

//Check add Comment, like comment and reply comment functions:

const comment1 = new Comment('Homemade Veggie Pizza!')
selman.addComment(comment1)
const comment2 = new Comment('Homemade mucver!')
selman.addComment(comment2)
armagan.addComment(comment2)
const reply1 = new Reply('This looks so yummy!')
armagan.replyComment(comment1,reply1)
neslihan.replyComment(comment1,reply1)
const reply2 = new Reply('It looks amazing!')
neslihan.replyComment(comment2,reply2)
neslihan.likeComment(comment1)
selman.likeReply(reply2)
armagan.likeReply(reply2)
//console.log(neslihan.replies)
//console.log(armagan.replies)
//console.log(armagan.replies,neslihan.replies,selman.comments)
//console.log(neslihan.likedComments[0].comment)
//console.log(neslihan.repliedComments[0].comment)
//console.log(selman.comments[0].repliedBy)
console.log(neslihan.replies[1].likedBy)

