CREATE DATABASE IF NOT EXISTS hagedu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hagedu;

-- Felhasználók
CREATE TABLE IF NOT EXISTS users (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    username   VARCHAR(50)  NOT NULL UNIQUE,
    email      VARCHAR(100) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    role       ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Helyszínek
CREATE TABLE IF NOT EXISTS venues (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(150) NOT NULL,
    tixa_url        VARCHAR(500),
    ticketswap_url  VARCHAR(500),
    bandsintown_url VARCHAR(500),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Kedvencek (felhasználó ↔ helyszín N:M)
CREATE TABLE IF NOT EXISTS favorites (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    user_id    INT NOT NULL,
    venue_id   INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_favorite (user_id, venue_id),
    FOREIGN KEY (user_id)  REFERENCES users(id)  ON DELETE CASCADE,
    FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE CASCADE
);

-- Események
CREATE TABLE IF NOT EXISTS events (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    category    VARCHAR(50)  NOT NULL DEFAULT 'Egyéb',
    date_time   DATETIME     NOT NULL,
    venue_id    INT,
    address     VARCHAR(255),
    image_url   VARCHAR(500),
    source_url  VARCHAR(500),
    source      VARCHAR(20)  DEFAULT 'egyeb',
    price_info  VARCHAR(100),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE SET NULL
);

-- Esemény kedvelések (felhasználó ↔ esemény N:M)
CREATE TABLE IF NOT EXISTS event_likes (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    user_id    INT NOT NULL,
    event_id   INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_like (user_id, event_id),
    FOREIGN KEY (user_id)  REFERENCES users(id)   ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id)  ON DELETE CASCADE
);
