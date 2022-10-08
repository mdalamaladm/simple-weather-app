# Simple Weather App
Login-based application to see simple weather information in your location and manage your simple profile  

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
4. Set secret key for OpenWeatherMap API Key and JWT Secret Key in `simple-weather-app.yaml` in server
```
- OPEN_WEATHER_MAP_KEY=yourkey
- JWT_SECRET=yourkey
```
5. Run docker-compose `simple-weather-app.yaml`
```
$ docker-compose -f simple-weather-app.yaml up
```
6. See the running application in `http://localhost:3000`
