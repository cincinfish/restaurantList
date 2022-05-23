// require packages used in the project
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

// require express-handlebars
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')

const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')

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
app.use(methodOverride('_method'))
app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})