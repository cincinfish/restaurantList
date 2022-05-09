// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', {
    restaurants: restaurantList.results
  })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)

  res.render('show', {
    restaurant: restaurant
  })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const keywords = keyword.split(',').map(item => item.trim())

  const searchRestaurant = []

  for (word of keywords) {
    const serResult = restaurantList.results.filter(restaurant => {
      return restaurant.name.toLowerCase().includes(word) || restaurant.name_en.toLowerCase().includes(word)
    })
    if (serResult[0] !== undefined) {
      searchRestaurant.push(serResult[0])
    }
  }

  res.render('index', {
    restaurants: searchRestaurant, keyword: keyword
  })

})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})