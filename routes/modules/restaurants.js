const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const { check, validationResult } = require('express-validator')

router.get('/new', (req, res) => {
  res.render('new')
})

// creat restaurant
router.post('/', [
  check('name').not().isEmpty().withMessage('Name cannot be empty'),
  check('image').isURL().withMessage('Please enter image'),
  check('google_map').isURL().withMessage('Please enter Google Map url'),
  check('rating').isNumeric().withMessage('Please enter google-map rating')
], (req, res) => {
  const userId = req.user._id
  const restaurantNew = req.body
  const restaurantCreate = {
    name: req.body.name
  }
  restaurantCreate.userId = userId
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).render('new', {
      errors: errors.array(),
      restaurant: { restaurantNew }
    })
  }
  const createItem = ['name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description']
  for (item of createItem) {
    if (req.body[item]) {
      restaurantCreate[item] = req.body[item]
    }
  }
  return Restaurant.create(restaurantCreate)
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
      res.render('/', { error: error.message })
    })
})

// browse restaurant
router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => {
      console.log(error)
      res.render('show', { error: error.message })
    })
})

// edit restaurant
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => {
      console.log(error)
      res.render('edit', { error: error.message })
    })
})

router.put('/:id', [
  check('name').not().isEmpty().withMessage('Name cannot be empty'),
  check('image').isURL().withMessage('Please enter image'),
  check('google_map').isURL().withMessage('Please enter Google Map url'),
  check('rating').isNumeric().withMessage('Please enter google-map rating')
], (req, res) => {
  const restaurantEdit = req.body
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).render('edit', {
      errors: errors.array(),
      restaurant: { restaurantEdit }
    })
  }
  const userId = req.user._id
  const _id = req.params.id

  return Restaurant.findOne({ _id, userId })
    .then((restaurant) => {
      restaurant = Object.assign(restaurant, restaurantEdit)
      restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => {
      console.log(error)
      res.render(`/restaurants/${_id}`, { error: error.message })
    })
})

// delete restaurant
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
      res.render('/', { error: error.message })
    })
})

module.exports = router