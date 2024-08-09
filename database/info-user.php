<?php
session_start();
header('Content-Type: application/json');
include("conf-user.php");

// Xóa bất kỳ đầu ra nào trước khi gửi phản hồi JSON
ob_start();

// Kiểm tra nếu người dùng đã đăng nhập và có ID trong session
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];

    // Truy vấn để lấy thông tin tài khoản
    $sql = "SELECT id, fullname, username, email, phone, role FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user_info = $result->fetch_assoc();
        echo json_encode($user_info);
    } else {
        echo json_encode(array("error" => "User not found"));
    }

    $stmt->close();
} else {
    echo json_encode(array("error" => "No user logged in"));
}

$conn->close();
?>
