// Kiểm tra trạng thái đăng nhập
if (!localStorage.getItem('loggedIn')) {
    window.location.href = '../login/login.html';
}
