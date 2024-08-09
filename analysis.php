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
    <link rel="stylesheet" type="text/css" href="/analysis/analysis.css">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link rel="stylesheet" type="text/css" href="mobile.css">
    <script defer src="/analysis/analysis.js"></script>
    <script defer src="app.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
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
        <button class="value" data-href="/index.php">GIỚI THIỆU</button>
        <button class="value" data-href="/dashboard.php">GIÁM SÁT</button>
        <button class="value-a" data-href="/analysis.php">PHÂN TÍCH</button>
        <button class="value" data-href="/data.php">DỮ LIỆU</button>
        <button class="value" data-href="/devices.php">THIẾT BỊ</button>
        <button class="value" data-href="/account.php">TÀI KHOẢN</button>
        <button class="value" data-href="/admin.php" id="admin-menu" style="display: none;">QUẢN TRỊ VIÊN</button>
        <button class="value" id="logout" >ĐĂNG XUẤT</button>
    </div>
    <div class="background">
        <div id="phantich" class="content">
            <!-- Nội dung phân tích -->
            <div>
                <div class="dateRange">Hiển thị dữ liệu theo: </div>
                <select id="dateRange">
                  <option value="week">Tuần</option>
                  <option value="month">Tháng</option>
                  <option value="year">Năm</option>
                </select>
            </div>
            <div class="data-chart">
                <canvas id="NhietDo"></canvas>
                <canvas id="DoAmDat"></canvas>
                <canvas id="DoAmKK"></canvas>
            </div>
        </div>
    </div>
    <footer>
        <div class="footer">
            <div style="font-family: Arial;" class="infor">
                <a style="font-weight: bold;">THÔNG TIN</a>
                <a><br><br>ĐỀ TÀI NGHIÊN CỨU KHOA HỌC 2023 - 2024 <br>
                TRƯỜNG ĐẠI HỌC GIAO THÔNG VẬN TẢI <br>KHOA ĐIỆN - ĐIỆN TỬ</a>
            </div>
            <div class="sinhvien">
                <a style="font-weight:bold">SINH VIÊN THỰC HIỆN<br></a>
                <a><br> - Đào Duy Long
                <br>- Phạm Tuệ Lĩnh
                <br>- Bùi Trung Hiếu
                <br>- Đỗ Việt Anh</a>
            </div>
            <div class="more" style="font-family: Arial">
                <a style="font-weight: bold">TÀI LIỆU THAM KHẢO<br></a>
                <a href=""><br>Link thêm sau</a>
                <a href=""><br>Link thêm sau</a>
                <a href=""><br>Link thêm sau</a>
                <a href=""><br>Link thêm sau</a>
            </div>
        </div>
    </footer>  
</body> 
</html>