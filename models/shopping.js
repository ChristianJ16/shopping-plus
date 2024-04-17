const mongoose = require('mongoose')

const shoppingSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: String,
  img: String,
  qty: {type: Number, required: true},
  price: Number
})

const Shopping = mongoose.model('Shopping', shoppingSchema)

module.exports = Shopping