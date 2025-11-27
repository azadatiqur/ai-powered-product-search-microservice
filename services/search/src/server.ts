import 'dotenv/config'
import { app } from './app'
import { connectRedis } from './cache'

const port = process.env.PORT || 8003

connectRedis().then(() => {
  app.listen(port, () => console.log(`search-service running on :${port}`))
})
