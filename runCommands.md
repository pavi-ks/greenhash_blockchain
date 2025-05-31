docker-compose down --volumes

docker system prune -a

docker-compose build --no-cache

docker-compose up