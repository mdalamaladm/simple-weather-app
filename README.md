# Simple Weather App

## Client
NuxtJS

## UI Component
Custom

## Server
ExpressJS

## Weather API
OpenWeatherMap Current Weather: https://openweathermap.org/current

## Database
PostgreSQL

## How To Run Application
1. Make sure docker installed
2. Clone the repo
3. Build db, server, and client images
```
$ docker build -t postgres-swa ./db/
$ docker build -t server-swa ./server/
$ docker build -t client-swa ./client/
```
4. Run docker-composer `simple-weather-app.yaml`
```
$ docker-compose -f simple-weather-app.yaml up
```
5. See the running application in `http://localhost:3000`