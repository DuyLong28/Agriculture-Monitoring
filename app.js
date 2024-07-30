//Cài đặt menu
var activeButton = null;

function handleMenuClick(event) {
    var target = event.target;

    // Kiểm tra xem phần tử nhấn có thuộc loại nút menu không
    if (!target.classList.contains('value')) {
        return; // Nếu không phải nút menu, thoát hàm
    }

    // Lấy URL từ thuộc tính data-href của nút menu
    var url = target.getAttribute('data-href');

    // Chuyển hướng đến URL
    if (url) {
        window.location.href = url;
    }
}

// Thêm sự kiện click cho toàn bộ menu
document.querySelector('.menu').addEventListener('click', handleMenuClick);

document.addEventListener('DOMContentLoaded', () => {
  // Giả sử bạn đã lưu tên tài khoản trong localStorage khi đăng nhập
  const userName = localStorage.getItem('username');

  // Kiểm tra nếu có tên tài khoản trong localStorage
  if (userName) {
      document.getElementById('userName').textContent = userName;
  }
  // Hiển thị mục quản trị nếu là admin
  if (localStorage.getItem('role') === 'admin') {
      const adminMenu = document.getElementById('admin-menu');
      if (adminMenu) {
          adminMenu.style.display = 'block';
      }
  }
  // Xóa thông tin đăng nhập khi người dùng đăng xuất
  document.getElementById('logout').addEventListener('click', function() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('role');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    window.location.href = 'login.html';
});
});


