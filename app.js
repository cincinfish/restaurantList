// require packages used in the project
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

// require express-handlebars
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json').results

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

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurantList })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {

  const keyword = req.query.keyword
  if (!keyword) {
    res.render('index', { keyword })
    return
  }
  const keywords = keyword.toLowerCase().split(',').map(item => item.trim())

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

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})