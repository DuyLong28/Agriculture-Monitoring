let originalData = {}; // Biến để lưu trữ dữ liệu gốc

document.addEventListener('DOMContentLoaded', function() {
    loadUserInfo();

    // Nút chỉnh sửa
    document.querySelector('.edit').addEventListener('click', function() {
        toggleEdit();
    });

    // Nút lưu
    document.querySelector('.save').addEventListener('click', function() {
        saveAccount();
    });

    // Nút hủy
    document.querySelector('.cancel').addEventListener('click', function() {
        cancelEditing();
    });
});

function loadUserInfo() {
    // Hiển thị thông báo tải
    document.getElementById('preloader').style.display = 'block';

    // Kiểm tra xem thông tin đã có trong localStorage chưa
    const cachedUserInfo = localStorage.getItem('userInfo');

    if (cachedUserInfo) {
        const data = JSON.parse(cachedUserInfo);
        updateUserInfo(data);
        originalData = { ...data }; // Lưu dữ liệu gốc để có thể phục hồi khi cần
        disableEditing();
        // Ẩn thông báo tải
        document.getElementById('preloader').style.display = 'none';
    } else {
        // Nếu không có thông tin trong localStorage, gửi yêu cầu đến server
        fetch('/database/info-user.php')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Lỗi khi tải thông tin tài khoản:', data.error);
                    alert('Không thể tải thông tin tài khoản.');
                    return;
                }

                // Lưu thông tin vào localStorage
                localStorage.setItem('userInfo', JSON.stringify(data));
                updateUserInfo(data);
                originalData = { ...data }; // Lưu dữ liệu gốc để có thể phục hồi khi cần
                disableEditing();
                // Ẩn thông báo tải
                document.getElementById('loading-message').style.display = 'none';
            })
            .catch(error => {
                console.error('Lỗi khi tải thông tin tài khoản:', error);
                // Hiển thị thông báo lỗi
                document.getElementById('loading-message').textContent = 'Có lỗi xảy ra khi tải thông tin.';
                document.getElementById('loading-message').style.display = 'block';
            });
    }
}

function updateUserInfo(data) {
    // Cập nhật thông tin tài khoản vào các trường
    document.getElementById('fullName').value = data.fullname || 'N/A';
    document.getElementById('userName').value = data.username || 'N/A';
    document.getElementById('phone').value = data.phone || 'N/A';
    document.getElementById('email').value = data.email || 'N/A';
    document.getElementById('role').value = data.role || 'N/A';
}

function toggleEdit() {
    const isEditing = document.querySelector('.save').style.display === 'block';

    if (isEditing) {
        saveAccount();
    } else {
        enableEditing();
    }
}

function enableEditing() {
    // Cho phép chỉnh sửa các trường, bao gồm username, nhưng không cho phép chỉnh sửa role
    document.querySelectorAll('#fullName, #phone, #email, #userName, #newPassword, #confirmPassword').forEach(input => {
        input.disabled = false;
    });
    document.getElementById('role').disabled = true; // Không cho phép chỉnh sửa role

    // Hiển thị nút Lưu và Hủy, ẩn nút Chỉnh sửa
    document.querySelector('.edit').style.display = 'none';
    document.querySelector('.save').style.display = 'block';
    document.querySelector('.cancel').style.display = 'block';
}

function disableEditing() {
    // Vô hiệu hóa tất cả các trường nhập liệu, bao gồm username, và giữ role không thay đổi
    document.querySelectorAll('#fullName, #phone, #email, #userName, #newPassword, #confirmPassword').forEach(input => {
        input.disabled = true;
    });
    document.getElementById('role').disabled = true; // Giữ role không thay đổi

    // Ẩn nút Lưu và Hủy, hiển thị nút Chỉnh sửa
    document.querySelector('.edit').style.display = 'block';
    document.querySelector('.save').style.display = 'none';
    document.querySelector('.cancel').style.display = 'none';
}

function saveAccount() {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword && newPassword !== confirmPassword) {
        alert('Mật khẩu mới và xác nhận mật khẩu không khớp.');
        return;
    }
    const account = {
        fullName: document.getElementById('fullName').value,
        username: document.getElementById('userName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        role: document.getElementById('role').value,
        newPassword: newPassword // Chỉ gửi mật khẩu mới nếu có thay đổi
    };

    fetch('/database/save-account.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(account)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Tài khoản đã được lưu thành công!');
            // Cập nhật localStorage với thông tin mới
            localStorage.setItem('userInfo', JSON.stringify(account));
            disableEditing(); // Chuyển trạng thái về không chỉnh sửa
        } else {
            console.error('Lỗi khi lưu tài khoản:', data.error);
            alert('Không thể lưu thông tin tài khoản.');
        }
    })
    .catch(error => console.error('Lỗi khi lưu tài khoản:', error));
}

function cancelEditing() {
    // Khôi phục dữ liệu gốc vào các trường
    updateUserInfo(originalData);

    // Xóa mật khẩu mới và xác nhận
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';

    // Chuyển trạng thái về không chỉnh sửa
    disableEditing();
}
