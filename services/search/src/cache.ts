import { createClient } from 'redis'
import 'dotenv/config'

export const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
})

redisClient.on('error', (err: Error) => console.error('Redis Client Error', err))

export async function connectRedis() {
  if (!redisClient.isOpen) await redisClient.connect()
}
