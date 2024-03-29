
import { HttpClient, HttpClientModule } from '@angular/common/http';

import * as jsonServer from 'json-server'
import { Express } from 'express'

import * as fs from 'fs'
import * as https from 'https'
import { handleAuthentication } from './auth'
import { handlerAuthorization } from './authz'


const server: Express = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, sta tic, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.use(jsonServer.bodyParser)

server.post('/login', handleAuthentication);
server.use('/orders', handlerAuthorization)

// Use default routes
server.use(router)

const options = {
  cert: fs.readFileSync('./backend/keys/cert.pem'),
  key: fs.readFileSync('./backend/keys/key.pem')
}

https.createServer(options,server)
.listen(3000, () => {
  console.log('JSON Server is running on https://localhost:3000')
})