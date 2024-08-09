<?php
session_start();
include("conf-user.php");

// Kiểm tra nếu có dữ liệu POST
if (isset($_POST['username']) && isset($_POST['password'])) {
    $username = htmlspecialchars($_POST['username']);
    $password = htmlspecialchars($_POST['password']);
    $rememberMe = isset($_POST['rememberMe']) ? (bool)$_POST['rememberMe'] : false;

    // Thực hiện truy vấn SQL để kiểm tra thông tin đăng nhập
    $sql = "SELECT id FROM users WHERE username = ? AND password = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $_SESSION['user_id'] = $user['id'];  // Lưu chỉ ID người dùng vào session
        
        // Xử lý lưu trữ thông tin đăng nhập
        if ($rememberMe) {
            setcookie('user_id', $user['id'], time() + (86400 * 30), "/"); // Lưu trữ cookie theo ID
            setcookie('rememberMe', 'true', time() + (86400 * 30), "/");
        } else {
            setcookie('user_id', '', time() - 3600, "/");
            setcookie('rememberMe', '', time() - 3600, "/");
        }
        $_SESSION['loggedIn'] = true;
        // Thêm đoạn mã JavaScript để lưu trạng thái loggedIn vào localStorage
        echo "<script>
                localStorage.setItem('loggedIn', 'true');
                window.location.href = '/index.php';
            </script>";
        exit();
        // Đảm bảo không có đầu ra trước khi chuyển hướng
        ob_clean();
        session_write_close();
        header("Location: /index.php");
        exit();
    } else {
        // Chuyển hướng tới trang đăng nhập với thông báo lỗi
        ob_clean();
        header("Location: /login.php?error=1");
        exit();
    }

    $stmt->close();
    $conn->close();
} else {
    // Hiển thị thông báo nếu không có dữ liệu POST
    echo "Thiếu dữ liệu POST.";
    exit();
}
?>
