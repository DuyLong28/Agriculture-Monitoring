<?php
session_start();
header('Content-Type: application/json');
include("conf-user.php");

// Xóa bất kỳ đầu ra nào trước khi gửi phản hồi JSON
ob_start();

// Kiểm tra nếu người dùng đã đăng nhập và có ID trong session
if (isset($_GET['id'])) {
    $user_id = intval($_GET['id']);

    // Truy vấn để xóa tài khoản
    $sql = "DELETE FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);

    if ($stmt->execute()) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("error" => "Failed to delete user"));
    }

    $stmt->close();
} else {
    echo json_encode(array("error" => "No user ID provided"));
}

$conn->close();
?>
