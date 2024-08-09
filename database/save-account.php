<?php
session_start();
header('Content-Type: application/json');
include("conf-user.php");

// Xóa bất kỳ đầu ra nào trước khi gửi phản hồi JSON
ob_start();

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'])) {
    $user_id = intval($data['id']);
    $fullname = $data['fullName'];
    $phone = $data['phone'];
    $email = $data['email'];
    $role = $data['role'];
    $new_password = $data['newPassword'];

    // Cập nhật thông tin tài khoản
    $sql = "UPDATE users SET fullname = ?, phone = ?, email = ?, role = ?";

    // Chỉ cập nhật mật khẩu nếu có thay đổi
    if (!empty($new_password)) {
        $sql .= ", password = ?";
    }

    $sql .= " WHERE id = ?";
    $params = array($fullname, $phone, $email, $role);

    if (!empty($new_password)) {
        $params[] = $new_password; // Thêm mật khẩu mới vào tham số
    }
    $params[] = $user_id;

    $stmt = $conn->prepare($sql);
    if (!empty($new_password)) {
        $stmt->bind_param("sssssi", $fullname, $phone, $email, $role, $params[4], $params[5]);
    } else {
        $stmt->bind_param("ssss", $fullname, $phone, $email, $role);
    }

    if ($stmt->execute()) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("error" => "Failed to update user"));
    }

    $stmt->close();
} else {
    echo json_encode(array("error" => "No user ID provided"));
}

$conn->close();
?>
