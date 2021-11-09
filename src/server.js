import express from 'express'
import cors from 'cors'
import routes from './routes.js'
import {} from './database/index.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})
