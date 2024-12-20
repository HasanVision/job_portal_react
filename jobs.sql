CREATE TABLE `jobs` (
    `id` INT(11) AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `requirements` TEXT NOT NULL,
    `salary` VARCHAR(50),
    `location` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `applications` (
    `id` INT(11) AUTO_INCREMENT PRIMARY KEY,
    `job_id` INT(11) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `resume` VARCHAR(255), -- Path to the uploaded resume file
    `cover_letter` TEXT,
    `status` ENUM('applied', 'shortlisted', 'rejected') DEFAULT 'applied',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE
);