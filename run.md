docker-compose down --volumes

docker system prune -a

docker-compose build --no-cache
docker-compose up
npx hardhat run scripts/deploy.js