const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('hello world')
})

// RUN SERVER
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
}) 