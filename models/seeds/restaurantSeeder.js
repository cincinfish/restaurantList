const mongoose = require('mongoose')
const restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb error!')
  restaurantList.forEach(element => {
    restaurant.create({
      res_id: element.id,
      name: element.name,
      name_en: element.name_en,
      category: element.category,
      location: element.location,
      google_map: element.google_map,
      phone: element.phone,
      rating: element.rating,
      description: element.description,
      image: element.image
    })
  })
  console.log('done')
})