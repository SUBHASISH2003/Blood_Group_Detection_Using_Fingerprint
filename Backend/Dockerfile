# 1) Base image with Node (Debian bookworm)
FROM node:18-bookworm

# 2) Install Python, pip, and venv
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip python3-venv \
 && rm -rf /var/lib/apt/lists/*

# 3) Workdir
WORKDIR /app

# 4) Install Node deps first (better layer caching)
COPY package*.json ./
RUN npm ci --only=production || npm install --production

# 5) Install Python deps in a virtual environment
COPY requirements.txt ./requirements.txt
RUN python3 -m venv /opt/venv && \
    /opt/venv/bin/pip install --no-cache-dir -r requirements.txt

# 6) Add venv to PATH so "python" and "pip" use venv
ENV PATH="/opt/venv/bin:$PATH"

# 7) Copy the rest of the backend (routes, services, python/, uploads/, etc.)
COPY . .

# 8) Prepare uploads dir (ephemeral on Render)
RUN mkdir -p uploads

# 9) Env for Node and Python path
ENV NODE_ENV=production
ENV PYTHON_PATH=python

# Render provides PORT at runtime; your server must listen on process.env.PORT
ENV PORT=10000

# 10) Start the Node server
CMD ["node", "server.js"]
