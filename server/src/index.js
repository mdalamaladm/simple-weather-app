const express = require('express');
const cors = require('cors');
const pg = require('pg');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const axios = require('axios');
const app = express();
const port = 5000;

const accessTokenSecret = 'aks83jali9kacjasd01lajs';

const pool = new pg.Pool({
  user: 'user',
  host: 'localhost',
  database: 'simple_weather_app',
  password: 'password',
  port: 5433
});

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, accessTokenSecret, (err) => {
      if (err) {
        return res.sendStatus(403);
      }

      const data = jwtDecode(token);

      req.user = data;

      next();
    })
  } else {
    res.sendStatus(401);
  }
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
  const { name, username, password } = req.body;
  
  pool.query(
    `INSERT INTO user_data VALUES ('${username}', '${password}')`,
    (err) => {
      if (err) {
        console.error(err);
        return res.sendStatus(400);
      }

      pool.query(
        `INSERT INTO profile(username, name) VALUES ('${username}', '${name}')`,
        (err) => {
          if (err) {
            console.error(err);
            return res.sendStatus(400);
          }
    
          res.sendStatus(200);
        }
      );
    }
  );
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  pool.query(
    `SELECT * FROM user_data WHERE username='${username}' AND password='${password}'`,
    (err, rst) => {
      if (err) {
        return res.sendStatus(400);
      }

      if (rst.rowCount === 1) {
        const token = jwt.sign({ username }, accessTokenSecret);

        res.status(200).json(token);
      } else {
        res.sendStatus(401);
      }
    }
  )
});

app.use(authenticateJWT);

app.get('/profile', (req, res) => {
  const username = req.user.username;

  pool.query(
    `SELECT * FROM profile WHERE username='${username}'`,
    (err, rst) => {
      if (err) {
        console.error(err);
        return res.sendStatus(400);
      }

      if (rst.rowCount === 1) {
        const user = rst.rows[0];

        res.status(200).json(user);
      } else {
        res.sendStatus(401);
      }
    }
  )
})

app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;

  const key = '6156d967f1482a072fbe4ff7c98b8ec1';

  axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((e) => {
      console.error(e);
      res.sendStatus(400);
    })
  ;
});

app.listen(port, () => `Simple Weather App is running on port: ${port}`);