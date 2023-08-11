const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const port = 4000

dotenv.config()

const emailRoutes = require('./routes/emailRoutes')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.use('/', emailRoutes)

app.listen(port, () => {
    console.log(`App is running in port ${port} successfully`)
})