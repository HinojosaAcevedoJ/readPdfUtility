const { Router } = require('express')
const { readPdf } = require('../controllers')

const routes = new Router()

routes.post('/', readPdf)

module.exports = routes
