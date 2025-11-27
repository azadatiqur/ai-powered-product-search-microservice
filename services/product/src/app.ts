import express from 'express'
import cors from 'cors'
import { router } from './routes'

export const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' })) // fine for metadata
app.use('/api', router)
