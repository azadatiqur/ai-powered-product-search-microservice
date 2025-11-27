# 1️⃣ Use Debian Slim base image (smaller than full Debian, includes necessary libs for Prisma)
FROM node:20-slim

# 2️⃣ Set working directory inside container
WORKDIR /app

# Install OpenSSL and other system dependencies for Prisma
RUN apt-get update && \
    apt-get install -y openssl libssl-dev libc6-dev g++ && \
    rm -rf /var/lib/apt/lists/*
    
# 3️⃣ Copy package files and tsconfig first for caching installs
COPY package.json package-lock.json* tsconfig.json ./

# 4️⃣ Install dependencies
RUN npm ci --production=false

# 5️⃣ Copy Prisma schema before generating client
COPY prisma ./prisma

# 6️⃣ Generate Prisma client (creates type-safe client for TS)
RUN npx prisma generate

# 7️⃣ Copy application source code
COPY src ./src

# 8️⃣ Build TypeScript to JS
RUN npm run build

# 9️⃣ Expose container port
EXPOSE 8002

# 🔟 Start the app
CMD ["npm", "start"]
