import { Router } from 'express'
import { pool } from './db'
import { redisClient } from './cache'

export const router = Router()

router.get('/health', (_, res) => res.json({ status: 'ok' }))

// Basic keyword search endpoint
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q as string
    if (!query) return res.status(400).json({ message: 'Query is required' })

    // check cache first
    const cacheKey = `search:${query.toLowerCase()}`
    const cached = await redisClient.get(cacheKey)
    if (cached) return res.json(JSON.parse(cached))

    // basic keyword search
    const result = await pool.query(
      `SELECT * FROM "Product" WHERE LOWER(title) LIKE $1 OR LOWER(description) LIKE $1 ORDER BY "createdAt" DESC`,
      [`%${query.toLowerCase()}%`]
    )

    // store in cache
    await redisClient.setEx(cacheKey, 60, JSON.stringify(result.rows))

    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// placeholder for semantic/hybrid search
router.get('/search/semantic', (_, res) => {
  res.json({ message: 'Semantic search will be implemented later' })
})
