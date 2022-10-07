CREATE TABLE user_data (
  username VARCHAR(100) PRIMARY KEY,
  password VARCHAR (127)
);

CREATE TABLE profile (
  username VARCHAR(100) PRIMARY KEY,
  name VARCHAR(100),
  age INT,
  nationality VARCHAR(50),
  favorite_weather VARCHAR(50),
  FOREIGN KEY (username) REFERENCES user_data(username)
);
