const express = require('express');
const cors = require('cors');
const pg = require('pg');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const axios = require('axios');
const app = express();
const port = 5000;
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
const openWeatherMapKey = process.env.OPEN_WEATHER_MAP_KEY;

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

    jwt.verify(token, jwtSecret, (err) => {
      if (err) {
        console.error(err)
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

  if (!name || !username || !password) return res.sendStatus(400);
  
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

  if (!username || !password) return res.sendStatus(400);

  pool.query(
    `SELECT * FROM user_data WHERE username='${username}' AND password='${password}'`,
    (err, rst) => {
      if (err) {
        console.error(err)
        return res.sendStatus(400);
      }

      if (rst.rowCount === 1) {
        const token = jwt.sign({ username }, jwtSecret);

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

app.put('/profile', (req, res) => {
  const data = req.body;
  const username = req.user.username;

  let setQuery = [];

  for (const name in data) {
    if (data[name]) setQuery.push(`${name}='${data[name]}'`);
  }

  if (setQuery.length > 0) {
    pool.query(
      `UPDATE profile SET ${setQuery.join(',')} WHERE username='${username}'`,
      (err) => {
        if (err) {
          console.error(err)
          return res.sendStatus(400)
        }

        res.sendStatus(200)
      }
    )
  } else {
    res.status(400).json({ message: 'no data changed' })
  }
})

app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;

  axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${openWeatherMapKey}`)
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