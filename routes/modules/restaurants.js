const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  res.render('new')
})

// creat restaurant
router.post('/', (req, res) => {
  const restaurantNew = req.body
  return Restaurant.create(restaurantNew)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// browse restaurant
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// edit restaurant
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const restaurantEdit = req.body
  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.name = restaurantEdit.name
      restaurant.name_en = restaurantEdit.name_en
      restaurant.category = restaurantEdit.category
      restaurant.image = restaurantEdit.image
      restaurant.location = restaurantEdit.location
      restaurant.phone = restaurantEdit.phone
      restaurant.google_map = restaurantEdit.google_map
      restaurant.rating = restaurantEdit.rating
      restaurant.description = restaurantEdit.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// delete restaurant
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})




module.exports = router