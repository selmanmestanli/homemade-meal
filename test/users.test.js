const request = require('supertest')
const app = require('../src/app')

describe('Users endpoints', () => {
  it('post request to /users should create a user', async () => {
    const userToCreate = {
      name: `SomeName${Date.now()}`,
      email: `somename${Date.now()}@gmail.com`,
      address: 'Berlin',
      postCode: 10589,
    }

    const createdUser = (await request(app).post('/users').send(userToCreate)).body
    expect(createdUser.name).toBe(userToCreate.name)
    expect(createdUser.email).toBe(userToCreate.email)
    expect(createdUser.address).toBe(userToCreate.address)
    expect(createdUser.postCode).toBe(userToCreate.postCode)
  })

  it('get request to /users should list users', async () => {
    const userList = (await request(app).get('/users')).body
    const usersExist = userList.length > 0

    expect(usersExist).toBe(true)
  })

  it('user should be able to like a photo', async () => {
    // create a photo
    const photo = (await request(app).post('/photos').send({ photoname: 'homemade-meal-test.png' })).body
    console.log('-------------photo--', photo)

    // create a user
    const userWithPhoto = (
      await request(app)
        .post('/users')
        .send({
          name: `PhotoOwnerUser${Date.now()}`,
          email: `PhotoOwnerUser${Date.now()}@gmail.com`,
          address: 'Munich',
          postCode: 39245,
        })
    ).body
    console.log('-------------userWithPhoto--', userWithPhoto)

    // add the photo to that user
    await request(app).post(`/users/${userWithPhoto._id}/photos`).send({ photoId: photo._id })

    // create another user
    const likerUser = {
      name: `LikerUser${Date.now()}`,
      email: `likeruser${Date.now()}@gmail.com`,
      address: 'Bremen',
      postCode: 45678,
    }

    const createdLikerUser = (await request(app).post('/users').send(likerUser)).body
    console.log('-------------createdLikerUser--', createdLikerUser)

    // like the photo with that another user
    await request(app).post(`/users/${createdLikerUser._id}/likedPhotos`).send({ photoId: photo._id })

    const finalUserWithPhoto = (await request(app).get(`/users/${userWithPhoto._id}/json`)).body
    console.log('-------------finalUserWithPhoto--', finalUserWithPhoto)

    const finalLikerUser = (await request(app).get(`/users/${createdLikerUser._id}/json`)).body
    console.log('-------------finalLikerUser--', finalLikerUser)

    expect(finalUserWithPhoto.photos.length).toBe(1)
    expect(finalLikerUser.likedPhotos.length).toBe(1)

    console.log('finalUserWithPhoto.photos[0].likedBy[0]._id', finalUserWithPhoto.photos[0].likedBy[0]._id)

    expect(finalUserWithPhoto.photos[0].likedBy[0]._id).toBe(finalLikerUser._id)
    expect(finalLikerUser.likedPhotos[0]).toBe(finalUserWithPhoto.photos[0]._id)
  })

  it('user should be able to like a recipe', async () => {
    // create a recipe
    const recipe = (await request(app).post('/recipes').send({ recipename: 'recipeBakedSalmon' })).body
    console.log('-------------recipe--', recipe)

    // create a user
    const userWithRecipe = (
      await request(app)
        .post('/users')
        .send({
          name: `RecipeOwnerUser${Date.now()}`,
          email: `RecipeOwnerUser${Date.now()}@gmail.com`,
          address: 'Brandenburg',
          postCode: 22345,
        })
    ).body
    console.log('-------------userWithRecipe--', userWithRecipe)

    // add the recipe to that user
    await request(app).post(`/users/${userWithRecipe._id}/recipes`).send({ recipeId: recipe._id })

    // create another user
    const recipeLikerUser = {
      name: `RecipeLikerUser${Date.now()}`,
      email: `recipelikeruser${Date.now()}@gmail.com`,
      address: 'Dresden',
      postCode: 55908,
    }

    const createdRecipeLikerUser = (await request(app).post('/users').send(recipeLikerUser)).body
    console.log('-------------createdRecipeLikerUser--', createdRecipeLikerUser)

    // like the recipe with that another user
    await request(app).post(`/users/${createdRecipeLikerUser._id}/likedRecipes`).send({ recipeId: recipe._id })

    const finalUserWithRecipe = (await request(app).get(`/users/${userWithRecipe._id}/json`)).body
    console.log('-------------finalUserWithRecipe--', finalUserWithRecipe)

    const finalRecipeLikerUser = (await request(app).get(`/users/${createdRecipeLikerUser._id}/json`)).body
    console.log('-------------finalRecipeLikerUser--', finalRecipeLikerUser)

    expect(finalUserWithRecipe.recipes.length).toBe(1)
    expect(finalRecipeLikerUser.likedRecipes.length).toBe(1)

    console.log('finalUserWithRecipe.recipes[0].likedBy[0]._id', finalUserWithRecipe.recipes[0].likedBy[0]._id)

    expect(finalUserWithRecipe.recipes[0].likedBy[0]._id).toBe(finalRecipeLikerUser._id)
    expect(finalRecipeLikerUser.likedRecipes[0]).toBe(finalUserWithRecipe.recipes[0]._id)
  })
})
