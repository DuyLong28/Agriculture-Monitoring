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
    <link rel="stylesheet" type="text/css" href="/devices/devices.css">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link rel="stylesheet" type="text/css" href="mobile.css">
    <script defer src="/devices/devices.js"></script>
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
        <button class="value" data-href="/index.php">GIỚI THIỆU</button>
        <button class="value" data-href="/dashboard.php">GIÁM SÁT</button>
        <button class="value" data-href="/analysis.php">PHÂN TÍCH</button>
        <button class="value" data-href="/data.php">DỮ LIỆU</button>
        <button class="value-a" data-href="/devices.php">THIẾT BỊ</button>
        <button class="value" data-href="/account.php">TÀI KHOẢN</button>
        <button class="value" data-href="/admin.php" id="admin-menu" style="display: none;">QUẢN TRỊ VIÊN</button>
        <button class="value" id="logout" >ĐĂNG XUẤT</button>
    </div>
    <div class="background">
        <div id="thietbi" class="content">
            <!-- Nội dung thiết bị -->
            <div class="table-container">
                <h1>Danh sách thiết bị</h1>
                <table class="device-table">
                    <thead>
                        <tr style="font-weight:bold">
                            <th>STT</th>
                            <th>Tên thiết bị</th>
                            <th>Thông tin</th>
                            <th>Hình ảnh</th>
                        </tr>
                    </thead>
                    <tbody id="deviceTableBody">
                        <!-- Dữ liệu sẽ được thêm động ở đây -->
                    </tbody>
                </table>
            </div> 
            
            <div id="addDevice">Thêm thiết bị</div>

            <div id="addDeviceForm">
                <h2>Nhập thông tin thiết bị mới</h2>
                <label for="deviceName">Tên thiết bị:</label>
                <input type="text" id="deviceName" name="deviceName" required>
                
                <label for="deviceInfo">Thông tin:</label>
                <input type="text" id="deviceInfo" name="deviceInfo" required>
                
                <label for="deviceImage">Hình ảnh (URL):</label>
                <input type="text" id="deviceImage" name="deviceImage" required>
                
                <button id="addDeviceButton">Thêm thiết bị</button>
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