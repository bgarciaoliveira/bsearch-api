//API criada por Bruno Garcia de Oliveira

const express = require('express')
const app = express()
const cors = require('cors')
const sendData = require('./middlewares/SendDataMiddleware')

app.use(sendData)
app.use(cors)
app.use('/api', require('./routes'))

const port = process.env.PORT || 7777

app.listen(port)

console.log(`Servidor iniciado na porta ${port}`)
