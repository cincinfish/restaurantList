const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// routes setting
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: "asc" })
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(error => {
      console.log(error)
      res.render('index', { error: error.message })
    })
})

//search restaurant
router.get('/search', (req, res) => {
  const userId = req.user._id
  const sortValue = req.query.sort
  const sortOptions = {
    "id-asc": { id: "asc" },
    "name-asc": { name: "asc" },
    "name-desc": { name: "desc" },
    "rating-asc": { rating: "asc" },
    "rating-desc": { rating: "desc" },
  }
  const sort = sortValue ? { [sortValue]: true } : { "id-asc": true }

  let keyword = req.query.keyword ? req.query.keyword : ''
  const keywords = keyword.split(',').map(item => {
    return new RegExp(item.trim(), 'i')
  })
  Restaurant.find({
    $or: [
      { name: { $in: keywords } },
      { name_en: { $in: keywords } },
      { category: { $in: keywords } }
    ],
    $and: [
      { userId }
    ]
  })
    .lean()
    .sort(sortOptions[sortValue])
    .then(restaurantList => {
      res.render('index', { restaurantList, keyword, sort })
    })
    .catch(error => {
      console.log(error)
      res.render('index', { error: error.message })
    })
})

module.exports = router

