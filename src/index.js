// require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const pdfRoutes = require('./routes/pdfReader.js')

const app = express()
const PORT = process.env.PORT || 4000

// middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload())

app.use('/readpdf', pdfRoutes)

app.listen(PORT, () => {
  console.log('El servidor está inicializado en el puerto 4000')
})
