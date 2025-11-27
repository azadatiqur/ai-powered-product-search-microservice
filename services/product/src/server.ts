import 'dotenv/config'
import { app } from './app'
import { connectRabbitMQ } from './rabbitmq'

const port = process.env.PORT || 8002
// app.listen(port, () => console.log(`product-service running on :${port}`))
async function startServer() {
  try {
    await connectRabbitMQ() // initialize RabbitMQ connection
    app.listen(port, () => console.log(`product-service running on :${port}`))
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

startServer()