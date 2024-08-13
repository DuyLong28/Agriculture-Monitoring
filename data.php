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
    <link rel="stylesheet" type="text/css" href="data/data.css">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link rel="stylesheet" type="text/css" href="mobile.css">
    <script defer src="data/data.js"></script>
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
        <button class="value-a" data-href="/data.php">DỮ LIỆU</button>
        <button class="value" data-href="/devices.php">THIẾT BỊ</button>
        <button class="value" data-href="/account.php">TÀI KHOẢN</button>
        <button class="value" data-href="/admin.php" id="admin-menu" style="display: none;">QUẢN TRỊ VIÊN</button>
        <button class="value" id="logout" >ĐĂNG XUẤT</button>
    </div>
    <div class="background">
        <div id="dulieu" class="content">
            <!-- Nội dung dữ liệu -->
            <div class="timkiem-back">
                <div class="h1-timkiem" style="font-weight: bold;font-size: 15px">Bộ lọc:</div>
                <input type="date" id="searchThoiGian" min="2000-01-01">
                <input type="text" id="searchNhietDo" placeholder="Nhiệt độ">
                <input type="text" id="searchDoAm" placeholder="Độ ẩm">
                <input type="text" id="searchDoAmDat" placeholder="Độ ẩm đất">
                <button id="searchButton">Tìm kiếm</button>
            </div>
            <div class="data-back">
                <table class="data-table">
                    <tbody>
                        <tr style="font-weight: bold;">
                            <td>Thời gian</td>
                            <td>Nhiệt độ</td>
                            <td>Độ ẩm không khí</td>
                            <td>Độ ẩm đất</td>
                        </tr>
                    </tbody>
                </table>
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