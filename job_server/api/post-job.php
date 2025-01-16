<?php
require_once('../config/database.php');


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['title']) || empty($data['requirements']) || empty($data['location'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields: title, requirements, and location are mandatory']);
    exit();
}


$title = htmlspecialchars($data['title'], ENT_QUOTES, 'UTF-8');
$requirements = htmlspecialchars($data['requirements'], ENT_QUOTES, 'UTF-8');
$salary = !empty($data['salary']) ? htmlspecialchars($data['salary'], ENT_QUOTES, 'UTF-8') : null;
$location = htmlspecialchars($data['location'], ENT_QUOTES, 'UTF-8');


$stmt = $conn->prepare("INSERT INTO jobs (title, requirements, salary, location) VALUES (?, ?, ?, ?)");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'SQL error: ' . $conn->error]);
    exit();
}


$stmt->bind_param('ssss', $title, $requirements, $salary, $location);
if ($stmt->execute()) {

    http_response_code(201);
    echo json_encode(['message' => 'Job posted successfully', 'id' => $stmt->insert_id]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to post job: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>