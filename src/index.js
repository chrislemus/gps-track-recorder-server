const express = require('express')
const mongoose = require('mongoose')
const app = express()
const {mongoDbPassword} = require('./apiConfig')

const mongoUri = `mongodb+srv://admin:${mongoDbPassword}@cluster0.clp4t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true
})
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance')
})
mongoose.connection.on('error', () => {
  console.error('error connecting to mongo')
})

app.get('/', (req, res) => {
  res.send('hi there')
})

app.listen(3000, () => {
  console.log("listening on port 3000")
})