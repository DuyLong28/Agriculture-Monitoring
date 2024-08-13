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
    <link rel="stylesheet" type="text/css" href="dashboard/dashboard.css">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link rel="stylesheet" type="text/css" href="mobile.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <script defer src="dashboard/dashboard.js"></script>
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
        <button class="value-a" data-href="/dashboard.php">GIÁM SÁT</button>
        <button class="value" data-href="/analysis.php">PHÂN TÍCH</button>
        <button class="value" data-href="/data.php">DỮ LIỆU</button>
        <button class="value" data-href="/devices.php">THIẾT BỊ</button>
        <button class="value" data-href="/account.php">TÀI KHOẢN</button>
        <button class="value" data-href="/admin.php" id="admin-menu" style="display: none;">QUẢN TRỊ VIÊN</button>
        <button class="value" id="logout" >ĐĂNG XUẤT</button>
    </div>
    <div class="background">
        <div id="giamsat" class="content">
            <!-- Nội dung giám sát -->
            <div class="data_nhietdo" style="font-family: Arial;">
                <div class="content_nhietdo">
                        <span>NHIỆT ĐỘ</span>
                    <div class="value_nhietdo">
                        <span>35</span>
                        <span>&deg;C</span>
                    </div>
                </div>
            </div>
            <div class="data_doam" style="font-family: Arial;">
                <div class="content_doam">
                        <span>ĐỘ ẨM KHÔNG KHÍ</span>
                    <div class="value_doam">
                        <span>85</span>
                        <span>%</span>
                    </div>
                </div>
            </div>
            <div class="data_doamdat" style="font-family: Arial;">
                <div class="content_doamdat">
                        <span>ĐỘ ẨM ĐẤT</span>
                    <div class="value_doamdat">
                        <span>40</span>
                        <span>%</span>
                    </div>
                </div>
            </div>
            <div class="maybom" id="maybom">
                <a class="content_maybom" style="font-family: Arial;">Máy bơm</a>
                <label class="switch_maybom">
                    <input type="checkbox" id="lock-maybom" disabled>
                    <div class="slider_maybom"></div>
                    <div class="slider-card_maybom">
                        <div class="slider-card-face_maybom slider-card-front_maybom"></div>
                        <div class="slider-card-face_maybom slider-card-back_maybom"></div>
                    </div>
                </label>
            </div>
            <div class="quatgio" id="quatgio">
                <a class="content_quatgio" style="font-family: Arial;">Quạt gió</a>
                <label class="switch_quatgio">
                    <input type="checkbox" id="lock-quatgio" disabled>
                    <div class="slider_quatgio"></div>
                    <div class="slider-card_quatgio">
                        <div class="slider-card-face_quatgio slider-card-front_quatgio"></div>
                        <div class="slider-card-face_quatgio slider-card-back_quatgio"></div>
                    </div>
                </label>
            </div>
            <div class="led1" id="led1">
                <a class="content_led1" style="font-family: Arial;">Đèn 1</a>
                <label class="switch_led1">
                    <input type="checkbox" id="lock-led1" disabled>
                    <div class="slider_led1"></div>
                    <div class="slider-card_led1">
                        <div class="slider-card-face_led1 slider-card-front_led1"></div>
                        <div class="slider-card-face_led1 slider-card-back_led1"></div>
                    </div>
                </label>
            </div>
            <div class="led2" id="led2">
                <a class="content_led2" style="font-family: Arial;">Đèn 2</a>
                <label class="switch_led2">
                    <input type="checkbox" id="lock-led2" disabled>
                    <div class="slider_led2"></div>
                    <div class="slider-card_led2">
                        <div class="slider-card-face_led2 slider-card-front_led2"></div>
                        <div class="slider-card-face_led2 slider-card-back_led2"></div>
                    </div>
                </label>
            </div>
            <div class="linechart">
                <canvas id="linechart"></canvas>
                <div class="text-chart">Dữ liệu trong ngày</div>
            </div>
            <button class="button_video">
                <div class="button_video_content" style="font-family: Arial;">Xem trực tiếp</div>
                <a class="icon"  href="http://192.168.1.224/" target="_blank">
                    <i class="fas fa-video"></i>
                </a>
            </button>
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