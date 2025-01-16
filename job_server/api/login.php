<?php
require_once('../config/database.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");


$data = json_decode(file_get_contents("php://input"));

if (isset($data->email, $data->password)) {
    $email = $data->email;
    $password = $data->password;

    $query = $conn->prepare("SELECT id, name, password FROM users WHERE email = ?");
    $query->bind_param("s", $email);
    $query->execute();
    $result = $query->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            echo json_encode([
                'message' => 'Login successful',
                'user' => ['id' => $user['id'], 'name' => $user['name'], 'email' => $email]
            ]);
        } else {
            echo json_encode(['error' => 'Invalid credentials']);
        }
    } else {
        echo json_encode(['error' => 'User not found']);
    }
} else {
    echo json_encode(['error' => 'Invalid input']);
}

$conn->close();
?>