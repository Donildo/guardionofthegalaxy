# Docker Setup

## Development

### Prerequisites
- Docker and Docker Compose installed

### Start Development Server

```bash
# Build and start the frontend container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

The frontend will be available at `http://localhost:5173`

### Development Features
- Hot reload enabled (changes are reflected immediately)
- Volume mounted for live code changes
- Network isolation
- Health check monitoring

### Commands Inside Container

```bash
# Run tests
docker-compose exec frontend yarn test

# Run linting
docker-compose exec frontend yarn lint

# Format code
docker-compose exec frontend yarn format

# Build for production
docker-compose exec frontend yarn build
```

## Production

### Build Production Image

```bash
docker build -t guardian-frontend:latest .
```

### Run Production Container

```bash
# Using docker-compose
docker-compose -f docker-compose.prod.yml up -d

# Or using docker directly
docker run -d \
  -p 3000:3000 \
  -e VITE_API_URL=http://backend:3001 \
  --name guardian-frontend \
  guardian-frontend:latest
```

The frontend will be available at `http://localhost:3000`

### Production Features
- Optimized build with serve
- Smaller image size using multi-stage build
- Health checks enabled
- Auto-restart on failure

## Network Configuration

Both docker-compose files use a custom network `guardian-network` to enable communication between frontend and backend services.

### To connect with backend:

```yaml
services:
  backend:
    networks:
      - guardian-network
  
  frontend:
    networks:
      - guardian-network
    environment:
      - VITE_API_URL=http://backend:3001
```

## Troubleshooting

### Port already in use
```bash
# Find process using port 5173
lsof -i :5173

# Kill the process
kill -9 <PID>
```

### Container won't start
```bash
# Check logs
docker-compose logs frontend

# Rebuild without cache
docker-compose build --no-cache
```

### Hot reload not working
- Ensure volume is mounted correctly in docker-compose.yml
- Check that Vite is running with `--host 0.0.0.0`
- Restart the container: `docker-compose restart frontend`

## Environment Variables

Create a `.env.docker` file for Docker-specific variables:

```env
VITE_API_URL=http://backend:3001
VITE_APP_ENV=development
```

Then run:
```bash
docker-compose --env-file .env.docker up
```
