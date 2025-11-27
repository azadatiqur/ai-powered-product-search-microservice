import amqplib from 'amqplib'
import 'dotenv/config'

let channel: amqplib.Channel

export async function connectRabbitMQ() {
  const conn = await amqplib.connect(process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672')
  channel = await conn.createChannel()
  await channel.assertQueue('product_events', { durable: true })
  console.log('Connected to RabbitMQ')
}

export function publishProductCreated(product: { id: string, title: string, description: string }) {
  if (!channel) throw new Error('RabbitMQ channel is not initialized')
  
  const msg = {
    event: 'product.created',
    payload: {
      id: product.id,
      title: product.title,
      description: product.description
    }
  }

  channel.sendToQueue('product_events', Buffer.from(JSON.stringify(msg)), { persistent: true })
  console.log('Published product.created event:', msg)
}
