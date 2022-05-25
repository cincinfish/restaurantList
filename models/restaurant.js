const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    default: 'none'
  },
  category: {
    type: String,
    default: 'none'
  },
  image: {
    type: String,
    default: 'none'
  },
  location: {
    type: String,
    default: 'none'
  },
  phone: {
    type: String,
    default: 'none'
  },
  google_map: {
    type: String,
    default: 'none'
  },
  rating: {
    type: Number,
    default: 'none'
  },
  description: {
    type: String,
    default: 'none'
  }
})

module.exports = mongoose.model('restaurantSeeder', RestaurantSchema)