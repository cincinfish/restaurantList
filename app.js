// require packages used in the project
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

// require express-handlebars
const exphbs = require('express-handlebars')
//const restaurantList = require('./restaurant.json').results
const Restaurant = require('./models/restaurant')

const bodyParser = require('body-parser')

// connect to mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('moogodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// routes setting
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(error => console.error(error))
})

// add new restaurant
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

// creat restaurant
app.post('/restaurants', (req, res) => {
  const restaurantNew = req.body
  return Restaurant.create({
    name: `${restaurantNew.name}`,
    name_en: `${restaurantNew.name_en}` || 'none',
    category: `${restaurantNew.category}` || 'none',
    image: `${restaurantNew.image}` || 'none',
    location: `${restaurantNew.location}` || 'none',
    phone: `${restaurantNew.phone}` || 'none',
    google_map: `${restaurantNew.google_map}` || 'none',
    rating: `${restaurantNew.rating}` || 'none',
    description: `${restaurantNew.description}` || 'none'
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// browse restaurant
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// edit restaurant
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
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
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


// search restaurant
app.get('/search', (req, res) => {

  const keyword = req.query.keyword
  if (!keyword) {
    res.render('index', { keyword })
    return
  }
  const keywords = keyword.toLowerCase().split(',').map(item => item.trim())

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
          if (serResult[i] !== undefined) {
            searchRestaurant.push(serResult[i])
          }
        }
      }
      res.render('index', { restaurantList: searchRestaurant, keyword })
    })
    .catch(error => console.log(error))
})


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})