
import express from 'express'
const routes = express.Router()

import UrlController from './controllers/UrlController.js'

routes.get('/', (req, res) => res.send('Welcome to MaraCurt'))
routes.get('/short', UrlController.shorten)
routes.get('/:shortened', UrlController.redirect)

export default routes
