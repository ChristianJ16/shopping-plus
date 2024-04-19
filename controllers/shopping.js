const express = require('express')
const router = express.Router()
const Shopping = require('../models/shopping.js')
const methodOverride = require('method-override')
const shoppingSeed = require('../seedData.js')

router.use(methodOverride('_method'))

router.get('/', async (req, res) => {
  const foundShoppings = await Shopping.find({})
  res.render('index.ejs', {
    shoppings: foundShoppings
  })
})

// New
router.get('/new', (req, res) => {
  res.render('newShopping.ejs')
})

// Seed
router.get('/seed', async (req, res) => {
  const shoppings = await Shopping.create(shoppingSeed)
  res.redirect('/shopping')
})

// Show
router.get('/:id', async (req, res) => {
  const foundShopping = await Shopping.findById(req.params.id)
  res.render('show.ejs', {
    shopping: foundShopping
  })
})

router.post('/', async (req, res) => {
  console.log(req.body)
  req.body.alreadyGot = req.body.alreadyGot ? true : false
  console.log('POST REQUEST MADE WITH: ', req.body)
  try {
    const newShopping = await Shopping.create(req.body)
    res.redirect('/shopping')
  }  catch (err) {
    console.log('ERROR WITH SHOPPING POST: ', err)
    res.status(500).send(err)
  }
})

// Edit Route
router.get('/:id/edit', async (req, res) => {
  const foundShopping = await Shopping.findById(req.params.id)
  res.render('edit.ejs', {
    shopping: foundShopping,
  })
})

//PUT
router.put('/:id', async (req, res) => {
  try {
    req.body.alreadyGot === 'on' ? req.body.alreadyGot = true : req.body.alreadyGot = false
  const updatedShopping = await Shopping.findByIdAndUpdate(req.params.id, req.body, {new: true})
  console.log(updatedShopping)
  res.redirect('/shopping/' + updatedShopping.id)
  } catch (err) {
    console.log("ERROR IN EDIT ROUTE: ", err)
    res.status(500).send(err)
  }
})



// DELETE
router.delete('/:id', async (req, res) => {
  try{
    const shopping = await Shopping.findByIdAndDelete(req.params.id)
    console.log(`Delete item: ${shopping}`)
    res.redirect('/shopping')
  } catch (err) {
    console.log("ERROR ON DELETE REQUEST: ", err)
    res.status(500).send(err)
  }
})


module.exports = router