const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')
const seedUsers = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantIndex: [1, 2, 3]
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantIndex: [4, 5, 6]
  }
]

db.once('open', () => {
  Promise.all(
    Array.from(seedUsers, seedUser => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password, salt))
        .then(hash => User.create({
          name: seedUser.name,
          email: seedUser.email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          const restaurants = restaurantList.filter(restaurant => {
            return seedUser.restaurantIndex.includes(restaurant.id)
          })
          const restaurantSeed = []
          Promise.all(
            Array.from(restaurants, restaurantIndex => {
              restaurantIndex.userId = userId 
              restaurantSeed.push(restaurantIndex)            
            })            
          )   
          return restaurant.create(restaurantSeed)           
        })
    }))
    .then(() => {
      console.log('done')
      process.exit()
    })
    .catch(err => console.log(err))
}) 