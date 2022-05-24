const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// routes setting
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: "asc" })
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(error => console.error(error))
})

//search restaurant
router.get('/search', (req, res) => {
  // if (!req.query.keyword) {
  //   return res.redirect("/")
  // }
  let keyword = req.query.keyword
  const sortValue = req.query.sort
  const sortOptions = {
    "id-asc": { id: "asc" },
    "name-asc": { name: "asc" },
    "name-desc": { name: "desc" },
    "rating-asc": { rating: "asc" },
    "rating-desc": { rating: "desc" },
  }
  const sort = sortValue ? { [sortValue]: true } : { "id-asc": true }
  if (!req.query.keyword) {
    keyword = ""
  }
  const keywords = [...new Set(keyword.toLowerCase().split(',').map(item => item.trim()))]

  Restaurant.find()
    .lean()
    .sort(sortOptions[sortValue])
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
      res.render('index', { restaurantList: searchRestaurant, keyword, sort })
    })
    .catch(error => console.log(error))

})

module.exports = router