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
  check('en_name').isAlphanumeric().withMessage('Please enter English Name'),
  check('category').isAscii().withMessage('Please enter category'),
  check('image').isURL().withMessage('Please enter image '),
  check('location').isAscii().withMessage('Please enter  location'),
  check('phone').isNumeric().withMessage('Please enter  phone'),
  check('google_map').isURL().withMessage('Please enter  Google Map url'),
  check('rating').isNumeric().withMessage('Please enter  google-map rating'),
  check('description').isNumeric().withMessage('Please enter description')
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).render('new', { errors: errors.array() })
  }

  const restaurantNew = req.body
  return Restaurant.create(restaurantNew)
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
      res.render('/', { error: error.message })
    })
})

// browse restaurant
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => {
      console.log(error)
      res.render('show', { error: error.message })
    })
})

// edit restaurant
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => {
      console.log(error)
      res.render('edit', { error: error.message })
    })
})

router.put('/:id', [
  check('name').not().isEmpty().withMessage('Name cannot be empty'),
  check('en_name').isAlphanumeric().withMessage('Please enter English Name'),
  check('category').isAscii().withMessage('Please enter category'),
  check('image').isURL().withMessage('Please enter image '),
  check('location').isAscii().withMessage('Please enter  location'),
  check('phone').isNumeric().withMessage('Please enter  phone'),
  check('google_map').isURL().withMessage('Please enter  Google Map url'),
  check('rating').isNumeric().withMessage('Please enter  google-map rating'),
  check('description').isNumeric().withMessage('Please enter description')
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).render('edit', { errors: errors.array() })
  }

  const id = req.params.id
  const restaurantEdit = req.body
  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant = Object.assign(restaurant, restaurantEdit)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => {
      console.log(error)
      res.render(`/restaurants/${id}`, { error: error.message })
    })
})

// delete restaurant
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
      res.render('/', { error: error.message })
    })
})

module.exports = router