const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const mongoURI = process.env.MONGO_URI 
const PORT = process.env.PORT

const methodOverride = require('method-override')

app.use(express.static('public'))

app.use(express.urlencoded({extened: true}))
app.use(methodOverride('_method'))

// CONTROLLERS
const shoppingController = require('./controllers/shopping.js')
app.use('/shopping', shoppingController)


// CONNECT TO MONGO
mongoose.connect(mongoURI)
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' error with mongo connection'))
db.on('connected', () => console.log('mongo is connected'))
db.on('disconnected', () => console.log('mongo disconnected'))

// RUN SERVER
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
}) 