import 'dotenv/config'
import { app } from './app'

const port = process.env.PORT || 8002
app.listen(port, () => console.log(`product-service running on :${port}`))
