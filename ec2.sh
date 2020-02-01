cd ./server
docker build -t server:latest .
docker run -d -p 5000:5000 server

cd ..
docker build -t ui:latest .
docker run -d -p 8080:8080 ui
