const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// routes setting
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(error => console.error(error))
})

//search restaurant
router.get('/search', (req, res) => {

  const keyword = req.query.keyword
  if (!keyword) {
    res.render('index', { keyword })
    return
  }
  const keywords = [...new Set(keyword.toLowerCase().split(',').map(item => item.trim()))]

  Restaurant.find()
    .lean()
    .then(restaurantList => {
      const searchRestaurant = []
      for (word of keywords) {
        const serResult = restaurantList.filter(restaurant => {
          return restaurant.name.toLowerCase().includes(word) ||
            restaurant.name_en.toLowerCase().includes(word) ||
            restaurant.category.toLowerCase().includes(word)
        })
        for (let i = 0; i < serResult.length; i++) {
          searchRestaurant.push(serResult[i])
        }
      }
      res.render('index', { restaurantList: searchRestaurant, keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router