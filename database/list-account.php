<?php
header('Content-Type: application/json');
include 'conf-user.php';

// Kết nối đến cơ sở dữ liệu
$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    echo json_encode(['error' => 'Kết nối đến cơ sở dữ liệu thất bại: ' . $conn->connect_error]);
    exit();
}

// Thực hiện truy vấn SQL
$sql = "SELECT id, fullName, username, phone, email FROM users";
$result = $conn->query($sql);

// Kiểm tra lỗi truy vấn
if (!$result) {
    echo json_encode(['error' => 'Truy vấn thất bại: ' . $conn->error]);
    exit();
}

// Chuyển dữ liệu thành mảng
$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

// Đóng kết nối
$conn->close();

// Trả về dữ liệu dưới dạng JSON
echo json_encode(['users' => $users]);
?>
