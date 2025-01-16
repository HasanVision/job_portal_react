<?php
require_once('../config/database.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 4; 
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;  
$offset = ($page - 1) * $limit;                          

$totalQuery = $conn->query("SELECT COUNT(*) as total FROM jobs");
$totalResult = $totalQuery->fetch_assoc();
$totalJobs = $totalResult['total'];
$totalPages = ceil($totalJobs / $limit);

$query = $conn->prepare("SELECT id, title, requirements, salary, location, created_at FROM jobs ORDER BY created_at DESC LIMIT ? OFFSET ?");
$query->bind_param("ii", $limit, $offset);
$query->execute();
$result = $query->get_result();

if ($result->num_rows > 0) {
    $jobs = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode([
        'jobs' => $jobs,
        'pagination' => [
            'totalJobs' => $totalJobs,
            'totalPages' => $totalPages,
            'currentPage' => $page,
        ]
    ]);
} else {
    echo json_encode(['message' => 'No jobs found']);
}

$conn->close();
?>