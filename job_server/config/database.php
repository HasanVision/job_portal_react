<?php
// Database configuration
$dbHost = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbName = "jobs";

// Create database connection
$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);

    if (!$conn) {
        http_response_code(500);
        echo json_encode(['message' => 'Database connection failed: ' . mysqli_connect_error()]);
        exit();
    }
}

?>