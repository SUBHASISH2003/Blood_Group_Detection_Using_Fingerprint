# 1) Base image with Node (Debian bookworm) 
FROM node:18-bookworm

# 2) Install Python and pip
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip \
 && rm -rf /var/lib/apt/lists/*

# 3) Workdir
WORKDIR /app

# 4) Install Node deps first (better layer caching)
COPY package*.json ./
RUN npm ci --only=production || npm install --production

# 5) Install Python deps
COPY requirements.txt ./requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt

# 6) Copy the rest of the backend (routes, services, python/, uploads/, etc.)
COPY . .

# 7) Prepare uploads dir (ephemeral on Render)
RUN mkdir -p uploads

# 8) Env for Node and Python path
ENV NODE_ENV=production
ENV PYTHON_PATH=python3
# Render provides PORT at runtime; your server must listen on process.env.PORT
ENV PORT=10000

# 9) Start the Node server
CMD ["node", "server.js"]
