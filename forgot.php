<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="login/reset.css">
    <link rel="stylesheet" href="login/forgot.css">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css">
    <script src="login/forgot.js"></script>
    <title>Forgot Password</title>
</head>
<body>
    <div class="preloader">
        <div class="loading"></div>
    </div>
    <div id="wrapper">
        <form action="" id="form-forgot-password">
            <h1 class="form-heading">Quên mật khẩu</h1>
            <div class="form-group">
                <i class="far fa-envelope"></i>
                <input type="email" class="form-input" placeholder="Email" id="email" required>
            </div>
            <input type="submit" value="Send mail" class="form-submit">
            <div class="sign-up">
                <span>Don't have an account? </span><a href="/sign-up.php" class="sign-up-link">Sign Up</a>
            </div>
            <div class="sign-up">
                <span>Do you already have an account? </span><a href="/login.php" class="sign-up-link">Login</a>
            </div>
        </form>
    </div>
</body>
</html>
