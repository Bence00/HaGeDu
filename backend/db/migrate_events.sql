-- Migration: add events and event_likes tables
-- Run this on existing databases that already have users, venues, favorites.

USE hagedu;

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

CREATE TABLE IF NOT EXISTS event_likes (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    user_id    INT NOT NULL,
    event_id   INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_like (user_id, event_id),
    FOREIGN KEY (user_id)  REFERENCES users(id)   ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id)  ON DELETE CASCADE
);
