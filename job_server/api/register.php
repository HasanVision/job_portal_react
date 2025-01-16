<?php
require_once('../config/database.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");


$data = json_decode(file_get_contents("php://input"));

if (isset($data->name, $data->email, $data->password)) {
    $name = $data->name;
    $email = $data->email;
    $password = password_hash($data->password, PASSWORD_BCRYPT);

    $query = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $query->bind_param("sss", $name, $email, $password);

    if ($query->execute()) {
        echo json_encode(['message' => 'Registration successful']);
    } else {
        echo json_encode(['error' => 'Email already exists']);
    }
} else {
    echo json_encode(['error' => 'Invalid input']);
}

$conn->close();
?>