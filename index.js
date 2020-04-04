const express = require('express')
const app = express()
const PORT = 3001
const bodyParser = require('body-parser')
const router = require('./router')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(router)

app.listen(PORT, () => console.log(`server is running at ${PORT}`))