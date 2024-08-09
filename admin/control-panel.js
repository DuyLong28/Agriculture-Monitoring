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

    // Nút xóa
    document.querySelector('.delete').addEventListener('click', function() {
        deleteAccount();
    });
});

function loadUserInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const accountId = urlParams.get('id');

    if (!accountId) {
        alert('Không có ID tài khoản.');
        return;
    }

    fetch(`/database/info-user.php?id=${accountId}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Lỗi khi tải thông tin tài khoản:', data.error);
                alert('Không thể tải thông tin tài khoản.');
                return;
            }

            // Lưu dữ liệu gốc để có thể phục hồi khi cần
            originalData = { ...data };

            // Cập nhật thông tin tài khoản vào các trường
            document.getElementById('fullName').value = data.fullname || 'N/A';
            document.getElementById('userName').value = data.username || 'N/A';
            document.getElementById('phone').value = data.phone || 'N/A';
            document.getElementById('email').value = data.email || 'N/A';
            document.getElementById('role').value = data.role || 'N/A';

            // Chỉ cho phép chỉnh sửa khi nhấn nút "Chỉnh sửa"
            disableEditing();
        })
        .catch(error => console.error('Lỗi khi tải thông tin tài khoản:', error));
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
    // Cho phép chỉnh sửa các trường
    document.querySelectorAll('#userName, #fullName, #phone, #email, #newPassword, #confirmPassword, #role').forEach(input => {
        input.disabled = false;
    });

    // Hiển thị nút Lưu và Hủy, ẩn nút Chỉnh sửa, Xóa và Quay lại
    document.querySelector('.edit').style.display = 'none';
    document.querySelector('.save').style.display = 'block';
    document.querySelector('.cancel').style.display = 'block';
    document.querySelector('.delete').style.display = 'none';
    document.querySelector('.go-back').style.display = 'none';
}

function disableEditing() {
    // Vô hiệu hóa tất cả các trường
    document.querySelectorAll('#userName, #fullName, #phone, #email, #newPassword, #confirmPassword, #role').forEach(input => {
        input.disabled = true;
    });

    // Hiển thị nút Chỉnh sửa, Xóa và Quay lại, ẩn nút Lưu và Hủy
    document.querySelector('.edit').style.display = 'block';
    document.querySelector('.save').style.display = 'none';
    document.querySelector('.cancel').style.display = 'none';
    document.querySelector('.delete').style.display = 'block';
    document.querySelector('.go-back').style.display = 'block';
}

function saveAccount() {
    const accountId = new URLSearchParams(window.location.search).get('id');
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword && newPassword !== confirmPassword) {
        alert('Mật khẩu mới và xác nhận mật khẩu không khớp.');
        return;
    }

    const account = {
        id: accountId,
        fullName: document.getElementById('fullName').value,
        userName: document.getElementById('userName').value,
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
            disableEditing(); // Chuyển trạng thái về không chỉnh sửa
        } else {
            console.error('Lỗi khi lưu tài khoản:', data.error);
            alert('Không thể lưu thông tin tài khoản.');
        }
    })
    .catch(error => console.error('Lỗi khi lưu tài khoản:', error));
}

function cancelEditing() {
    // Khôi phục dữ liệu gốc
    document.getElementById('fullName').value = originalData.fullname || 'N/A';
    document.getElementById('userName').value = originalData.username || 'N/A';
    document.getElementById('phone').value = originalData.phone || 'N/A';
    document.getElementById('email').value = originalData.email || 'N/A';

    // Xóa mật khẩu mới và xác nhận
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';

    // Quay về trạng thái không chỉnh sửa
    disableEditing();
}

function deleteAccount() {
    if (confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
        const accountId = new URLSearchParams(window.location.search).get('id');

        fetch(`/database/delete-account.php?id=${accountId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Tài khoản đã được xóa thành công!');
                window.location.href = '/admin.php'; // Quay về danh sách tài khoản
            } else {
                console.error('Lỗi khi xóa tài khoản:', data.error);
                alert('Không thể xóa tài khoản.');
            }
        })
        .catch(error => console.error('Lỗi khi xóa tài khoản:', error));
    }
}

function goBack() {
    window.history.back();
}
