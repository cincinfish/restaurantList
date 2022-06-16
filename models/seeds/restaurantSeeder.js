const restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  restaurantList.forEach(element => {
    restaurant.create({
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
      .then(() => {
        console.log('done')
        return db.close()
      })
      .catch(err => console.log(err))
  })
}) 