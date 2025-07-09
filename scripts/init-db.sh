#!/bin/bash

# Initialize Database Script for StrataVision
echo "🚀 Initializing StrataVision Database..."

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
until docker-compose exec postgres pg_isready -U stratavision; do
  echo "PostgreSQL is not ready yet. Waiting..."
  sleep 2
done

echo "✅ PostgreSQL is ready!"

# Run Prisma migrations
echo "🔄 Running Prisma database push..."
docker-compose exec app npx prisma db push

echo "✅ Database initialized successfully!"

# Optional: Seed the database
# echo "🌱 Seeding database..."
# docker-compose exec app npm run seed

echo "🎉 Database setup complete!" 