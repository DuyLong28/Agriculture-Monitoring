<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/login/reset.css">
    <link rel="stylesheet" href="/login/sign-up.css">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css">
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="/login/sign-up.js"></script>
    <title>Sign Up for Agriculture Monitoring</title>
</head>
<body>
    <div class="preloader">
        <div class="loading"></div>
    </div>
    <div id="wrapper">
        <form action="" id="form-signup">
            <h1 class="form-heading">Đăng ký tài khoản</h1>
            <div class="form-group">
                <i class="far fa-user"></i>
                <input type="text" class="form-input" placeholder="Tên đầy đủ" id="fullName" required>
            </div>
            <div class="form-group">
                <i class="far fa-user"></i>
                <input type="text" class="form-input" placeholder="Tên đăng nhập" id="username" required>
            </div>
            <div class="form-group">
                <i class="fas fa-key"></i>
                <input type="password" class="form-input" placeholder="Mật khẩu" id="password" required>
                <div class="eye">
                    <i class="far fa-eye"></i>
                </div>
            </div>
            <div class="form-group">
                <i class="fas fa-key"></i>
                <input type="password" class="form-input" placeholder="Xác nhận mật khẩu" id="confirmPassword" required>
                <div class="eye">
                    <i class="far fa-eye"></i>
                </div>
            </div>
            <div class="form-group">
                <i class="far fa-envelope"></i>
                <input type="email" class="form-input" placeholder="Email" id="email" required>
            </div>
            <div class="form-group">
                <i class="fas fa-phone"></i>
                <input type="tel" class="form-input" placeholder="Số điện thoại" id="phone" required>
            </div>
            <div id="error-message" style="color: red; display: none;">Có lỗi xảy ra, vui lòng thử lại!</div>
            <input type="submit" value="Đăng ký" class="form-submit">
            <div class="sign-up">
                <span>Do you already have an account?</span><a href="/login.php" class="sign-up-link">Login</a>
            </div>
        </form>
    </div>  
</body>
</html>
