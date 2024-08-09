<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/login/reset.css">
    <link rel="stylesheet" href="/login/login.css">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css">
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script defer src="/login/login.js"></script>
    <title>Login to Agriculture monitoring</title>
</head>
<body>
    <div class="preloader">
        <div class="loading"></div>
    </div>
    <div id="wrapper">
        <form action="/database/act-login.php" method="post" id="form-login">
            <h1 class="form-heading">Đăng nhập tài khoản</h1>
            <div class="form-group">
                <i class="far fa-user"></i>
                <input type="text" class="form-input" placeholder="Tên đăng nhập" id="username" name="username">
            </div>
            <div class="form-group">
                <i class="fas fa-key"></i>
                <input type="password" class="form-input" placeholder="Mật khẩu" id="password" name="password">
                <div id="eye">
                    <i class="far fa-eye"></i>
                </div>
            </div>
            <div class="form-options">
                <label for="rememberMe" class="rememberMe">
                    <input type="checkbox" id="rememberMe"> Remember Me
                </label>
                <a href="forgot.php" class="forgot-password">Forgot Password?</a>
            </div>
            <?php if (isset($_GET['error'])): ?>
                <div id="error-message" style="color: red;">Tên đăng nhập hoặc mật khẩu không đúng!</div>
            <?php endif; ?>
            <input type="submit" value="Đăng nhập" class="form-submit">
            <div class="sign-up">
                <span>Don't have an account? </span><a href="sign-up.php" class="sign-up-link">Sign Up</a>
            </div>
        </form>
    </div>  
</body>
</html>
