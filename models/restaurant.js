const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    default: 'None'
  },
  category: {
    type: String,
    default: 'None'
  },
  image: {
    type: String,
    default: 'https://image.shutterstock.com/image-photo/interior-cozy-restaurant-contemporary-design-600w-709645828.jpg'
  },
  location: {
    type: String,
    default: 'None'
  },
  phone: {
    type: String,
    default: '0'
  },
  google_map: {
    type: String,
    default: 'None'
  },
  rating: {
    type: Number,
    default: '0'
  },
  description: {
    type: String,
    default: 'None'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    require: true
  }
})

module.exports = mongoose.model('restaurantSeeder', RestaurantSchema)