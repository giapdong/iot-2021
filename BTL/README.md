# IoT project group 20

## Prune docker enviroment

```
docker network prune -f && docker image prune -f && docker container prune -f
```

## Run Server
```
cd server && docker-compose up --build
```

## Run Plate service
```
cd plate-service && docker-compose up --build
```

## Run Client
```
cd vue-client && npm run serve
```

## Run camera sensor
```
cd camera-sensor && npm start
```