<?php
session_start();

// Kiểm tra xem người dùng đã đăng nhập hay chưa
if (!isset($_SESSION['loggedIn'])) {
    header("Location: login.php");
    exit();
}
?>
<html lang="en">
<head>
    <title>Agriculture monitoring</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="utf-8" >
    <link rel="icon" href="data:">
    <link rel="stylesheet" type="text/css" href="admin/control-panel.css">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link rel="stylesheet" type="text/css" href="mobile.css">
    <script defer src="admin/control-panel.js"></script>
    <script defer src="app.js"></script>
</head>
<body>
    <div class="preloader">
        <div class="loading"></div>
    </div>
    <div class="container">
        <table class="header">
            <tbody>
                <td><img class="logo" src="/images/header.png"></td>
                <td style="font-weight: bold;" class="title">HỆ THỐNG GIÁM SÁT NÔNG NGHIỆP THÔNG MINH BẰNG IOT</td>
            </tbody>
        </table>
    </div>
    <div class="menu">
        <a class="user-name" id="userFullname"></a>
        <button class="value" data-href="/home.php">GIỚI THIỆU</button>
        <button class="value" data-href="/dashboard.php">GIÁM SÁT</button>
        <button class="value" data-href="/analysis.php">PHÂN TÍCH</button>
        <button class="value" data-href="/data.php">DỮ LIỆU</button>
        <button class="value" data-href="/devices.php">THIẾT BỊ</button>
        <button class="value" data-href="/account.php">TÀI KHOẢN</button>
        <button class="value-a" data-href="/admin.php" id="admin-menu" style="display: none;">QUẢN TRỊ VIÊN</button>
        <button class="value" id="logout" >ĐĂNG XUẤT</button>
    </div>
    <div class="background">
        <div class="title-control">Chỉnh sửa tài khoản</div>
        <div class="form-container">
            <div class="form-row">
                <div class="form-group">
                    <label for="fullName">Họ tên:</label>
                    <input type="text" id="fullName">
                </div>
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="userName">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="phone">Số điện thoại:</label>
                    <input type="text" id="phone">
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="role">Role:</label>
                    <select id="role">
                        <option value="admin">Admin</option>
                        <option value="staff">Staff</option>
                        <option value="viewer">Guest</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="newPassword">Mật khẩu mới:</label>
                    <input type="password" id="newPassword">
                </div>
                <div class="form-group">
                    <label for="confirmPassword">Xác nhận mật khẩu:</label>
                    <input type="password" id="confirmPassword">
                </div>
            </div>
            <div class="form-row">
                <button class="edit" onclick="toggleEdit()">Chỉnh sửa</button>
                <button class="save" onclick="saveAccount()" style="display: none;">Lưu</button>
                <button class="cancel" onclick="cancelEditing()" style="display: none;">Hủy</button>
                <button class="delete" onclick="deleteAccount()">Xóa Tài Khoản</button>
                <button class="go-back" onclick="goBack()" style="display: block;">Quay lại</button>
            </div>
        </div>
    </div>    
</body>
</html>
