const mongoose = require('mongoose')
const restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json').results

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('moogodb error!')

  for (let i = 0; i < restaurantList.length; i++) {
    restaurant.creat({ i })
  }

  console.log('done')
})

db.once('open', () => {
  console.log('mongodb connected!')
})