#### Overview:

![alt text](schema.png)

#### Start the project in docker

It will start and run the UDP, TCP server, RabbitMQ and PG

```sh
docker compose up backend -d --build
```

then run your python script to load telemetry in PG:

```sh
python3 clients.py localhost 41234 3000
```

and make a GET request to list all devices telemetry:
`http://localhost:3000/api/v1/telemetry`
or filtered on a device:
`http://localhost:3000/api/v1/telemetry/<NAME>`

#### Start the project locally

start containers

```sh
docker compose up
```

create database migration and sync

```sh
make init-prima
```

install dependencies

```sh
npm install
```

build TS

```sh
npm run build
```

start UDP server that is also the MQ producer

```sh
npm run start:udp
```

start the MQ consumer

```sh
npm run start:consumer
```

start the TCP server

```sh
npm run start:api
```
