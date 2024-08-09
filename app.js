//Loading   
window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
        preloader.classList.add("unactive");
});

//Cài đặt menu
var activeButton = null;

function handleMenuClick(event) {
    var target = event.target;

    // Lấy URL từ thuộc tính data-href của nút menu
    var url = target.getAttribute('data-href');

    // Chuyển hướng đến URL
    if (url) {
        window.location.href = url;
    }
}

// Thêm sự kiện click cho toàn bộ menu
document.querySelector('.menu').addEventListener('click', handleMenuClick);

document.addEventListener('DOMContentLoaded', async function() {
    // Lấy thông tin người dùng từ localStorage
    let inforuser = JSON.parse(localStorage.getItem('userInfo'));

    if (!inforuser) {
        try {
            // Gửi yêu cầu đến info-user.php để lấy thông tin tài khoản
            const response = await fetch('/database/info-user.php');

            if (!response.ok) {
                throw new Error(`Mã lỗi: ${response.status}`);
            }

            // Đọc phản hồi dưới dạng văn bản
            const text = await response.text();
            // Phân tích văn bản thành JSON
            inforuser = JSON.parse(text);

            // Kiểm tra lỗi từ phản hồi
            if (inforuser.error) {
                console.error('Lỗi khi lấy thông tin tài khoản:', inforuser.error);
                return;
            }

            // Lưu thông tin tài khoản vào localStorage
            localStorage.setItem('userInfo', JSON.stringify(inforuser));
        } catch (error) {
            // Xử lý lỗi khi gửi yêu cầu hoặc phân tích JSON
            console.error('Lỗi khi gửi yêu cầu hoặc phân tích cú pháp JSON:', error);
            return; // Dừng xử lý nếu có lỗi
        }
    }

    // Hiển thị thông tin tài khoản trên giao diện người dùng
    updateUserInfo(inforuser);
});

// Hàm cập nhật thông tin người dùng trên giao diện
function updateUserInfo(inforuser) {
    const userIdElement = document.getElementById('userId');
    const userFullnameElement = document.getElementById('userFullname');
    const userRoleElement = document.getElementById('userRole');

    if (userIdElement) userIdElement.textContent = inforuser.id || 'N/A';
    if (userFullnameElement) userFullnameElement.textContent = inforuser.fullname || 'N/A';
    if (userRoleElement) userRoleElement.textContent = inforuser.role || 'N/A';

    const adminMenuElement = document.getElementById('admin-menu');
    // Hiển thị menu admin nếu vai trò là admin
    if (adminMenuElement) {
        if (inforuser.role === 'admin') {
            adminMenuElement.style.display = 'block'; // Hiển thị phần tử
        }
    }
}


document.getElementById('logout').addEventListener('click', function() {
    // Xóa thông tin tài khoản khỏi localStorage và sessionStorage
    localStorage.removeItem('userInfo');
    sessionStorage.clear();

    // Gọi trang logout.php để hủy session trên server
    fetch('/database/logout.php', { method: 'GET' })
        .then(response => {
            // Chuyển hướng đến trang đăng nhập sau khi session bị hủy
            window.location.href = 'login.php';
        })
        .catch(error => console.error('Error logging out:', error));
});




