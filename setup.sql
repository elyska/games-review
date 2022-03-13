-- mysql -u root -p
-- p455w0rd
-- SHOW DATABASES;
-- use website;
-- SHOW TABLES;
-- source setup.sql

-- make sure the websiteuser account is set up and has the correct privileges
CREATE USER IF NOT EXISTS websiteuser IDENTIFIED BY 'websitepassword';
GRANT INSERT, SELECT, UPDATE, DELETE ON website.* TO websiteuser;

DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS reviews;

CREATE TABLE IF NOT EXISTS accounts (
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(25) NOT NULL,
  pass VARCHAR(70) NOT NULL
);

INSERT INTO accounts(user, pass)
	VALUES("doej", "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO"),
  ("user1", "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO"),
  ("user2", "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO"),
  ("user3", "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO");

CREATE TABLE IF NOT EXISTS games (
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  publisher VARCHAR(60) NOT NULL,
  year YEAR(4) NOT NULL,
  description TEXT NOT NULL,
  image BLOB DEFAULT NULL,
  creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  username VARCHAR(25) NOT NULL
);

INSERT INTO games(name, publisher, year, description, image, creationDate, username)
	VALUES("Chrome Dino", "Google", "2014", "The player guides a pixelated Tyrannosaurus rex across a side-scrolling landscape, avoiding obstacles to achieve a higher score.", "images/placeholder.png", "2022-03-11 18:08:11", "doej"), 
  ("Pac-Man", "Namco", "1980", "Pac-Man is an action maze chase video game; the player controls the eponymous character through an enclosed maze.", "images/placeholder.png", "2022-03-11 18:08:11", "doej"), 
  ("Missile Command", "Arcade", "1980", "The game is played by moving a crosshair across the sky background via a trackball and pressing one of three buttons to launch a counter-missile from the appropriate battery.", "images/placeholder.png", "2022-03-11 18:08:11", "doej"),
  ("The Sims", "Electronic Arts", "2000", "The Sims is a series of life simulation video games developed by Maxis and published by Electronic Arts.", "images/placeholder.png", "2022-03-11 18:08:11", "doej"),
  ("3D Pinball", "Microsoft", "1995", "3D Pinball for Windows – Space Cadet is a version of the Space Cadet table bundled with Microsoft Windows.", "images/placeholder.png", "2022-03-11 18:08:11", "doej");

CREATE TABLE IF NOT EXISTS reviews (
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  rating TINYINT NOT NULL,
  review TEXT NOT NULL,
  creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  username VARCHAR(25) NOT NULL,
  gameId MEDIUMINT UNSIGNED NOT NULL
);

INSERT INTO reviews(rating, review, username, gameId)
	VALUES(4, "Exciting game", "user1", 1),
  (5, "My favourite game", "doej", 1),
  (5, "Fun to play when you don't have a connection", "user2", 1),
  (4, "This is the game that started it all, it truly was the first in video game franchises, icons, and just everything, without this little guy we wouldn't be where we are now. Pac Man was more than just a game, it was a *phenomenon* as it has become a staple in the 80's decade.", "user3", 2),
  (4, "Good game", "doej", 2),
  (0, "Boring game", "user1", 2),
  (3, "Not the best", "user3", 3),
  (1, "I don't like it", "user1", 3),
  (3, "Quite fun", "user2", 3),
  (5, "A very **creative** game. You can build houses etc. also you can set your goal. For example you can start as a poor sim and then get rich, you can fulfill the goal of aspiration and more.", "doej", 4),
  (5, "My 7 year old daughter has been playing for at least a year now. She really enjoys it.", "user3", 4),
  (2, "Too addictive", "user2", 5),
  (4, "The best thing that Space Cadet Pinball has going for it is that it's free.", "user3", 5),
  (0, "I don't like it", "user1", 5);
