// Requirements
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const usersC = require('./controllers/usersController')

// App instance
const app = express()

app.use(bodyParser.json())
app.use('/', router)
router.get('/users', usersC.get);

// App started
const port = process.env.PORT || 8080
app.listen(port)
console.log('Server listening on port: http://localhost:' + port)