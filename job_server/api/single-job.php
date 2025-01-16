<?php
require_once('../config/database.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");


error_reporting(E_ALL);
ini_set('display_errors', 1);

if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $job_id = intval($_GET['id']);

    $stmt = $conn->prepare("SELECT id, title, requirements, salary, location, created_at FROM jobs WHERE id = ?");
    if (!$stmt) {
        echo json_encode(['message' => 'Failed to prepare query', 'error' => $conn->error]);
        exit();
    }

    $stmt->bind_param("i", $job_id);
    if (!$stmt->execute()) {
        echo json_encode(['message' => 'Failed to execute query', 'error' => $stmt->error]);
        exit();
    }

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $job = $result->fetch_assoc();
        echo json_encode($job);
    } else {
        echo json_encode(['message' => 'Job not found']);
    }

    $stmt->close();
} else {
    echo json_encode(['message' => 'Invalid or missing job ID']);
}

$conn->close();
?>