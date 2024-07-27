$(document).ready(function() {
    // Đặt sự kiện sau khi DOM đã sẵn sàng
    $('#eye').click(function() {
        $(this).toggleClass('open');
        $(this).children('i').toggleClass('fa-eye-slash fa-eye');
        if ($(this).hasClass('open')) {
            $(this).prev().attr('type', 'text');
        } else {
            $(this).prev().attr('type', 'password');
        }
    });

    const formLogin = document.getElementById('form-login');
    const inputPassword = document.getElementById('password');

    if (formLogin) {
        formLogin.addEventListener('submit', function(event) {
            event.preventDefault(); // Ngăn chặn form submit mặc định
            login();
        });
    } else {
        console.error('Form login không được tìm thấy.');
    }

    if (inputPassword) {
        inputPassword.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                login();
            }
        });
    } else {
        console.error('Input password không được tìm thấy.');
    }

    function login() {
        // Lấy giá trị từ input
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Ẩn thông báo lỗi trước khi kiểm tra lại
        const errorMessage = document.getElementById('error-message');
        if (errorMessage) {
            errorMessage.style.display = 'none';
        } else {
            console.error('Thông báo lỗi không được tìm thấy.');
        }

        // Gửi yêu cầu tới server để lấy thông tin tài khoản từ file JSON
        fetch('../database/accounts.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const users = data.users;
                const user = users.find(user => user.username === username && user.password === password);

                if (user) {
                    // Lưu trạng thái đăng nhập trong Local Storage
                    localStorage.setItem('username', username);
                    localStorage.setItem('loggedIn', 'true');
                    localStorage.setItem('role', user.role);
                    // Chuyển hướng tới trang chính
                    window.location.href = '../index.html';
                } else {
                    // Hiển thị thông báo lỗi
                    if (errorMessage) {
                        errorMessage.style.display = 'block';
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
                if (errorMessage) {
                    errorMessage.innerText = 'Có lỗi xảy ra. Vui lòng thử lại.';
                    errorMessage.style.display = 'block';
                }
            });
    }
});
