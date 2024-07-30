// Kiểm tra trạng thái đăng nhập
if (!localStorage.getItem('loggedIn')) {
    window.location.href = '../login/login.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const accountId = urlParams.get('id');

    if (accountId) {
        loadAccount(accountId);
    }
});

function loadAccount(id) {
    fetch('../database/accounts.json')
        .then(response => response.json())
        .then(data => {
            const account = data.users.find(acc => acc.id === parseInt(id));
            if (account) {
                document.getElementById('fullName').value = account.fullName;
                document.getElementById('username').value = account.username;
                document.getElementById('phone').value = account.phone;
                document.getElementById('email').value = account.email;
                document.getElementById('role').value = account.role;
            }
        })
        .catch(error => console.error('Error loading account:', error));
}

function saveAccount() {
    const account = {
        id: parseInt(new URLSearchParams(window.location.search).get('id')),
        fullName: document.getElementById('fullName').value,
        username: document.getElementById('username').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        role: document.getElementById('role').value
    };

    fetch('../database/accounts.json')
        .then(response => response.json())
        .then(data => {
            const index = data.users.findIndex(acc => acc.id === account.id);
            if (index !== -1) {
                data.users[index] = account;
            } else {
                data.users.push(account);
            }

            // Lưu dữ liệu cập nhật lại vào tệp JSON (điều này cần backend để xử lý thao tác ghi)
            // Phần này chỉ là mô phỏng, cần một server backend để xử lý trong ứng dụng thực tế.
            console.log('Account saved:', account);
        })
        .catch(error => console.error('Error saving account:', error));
}

function deleteAccount() {
    const accountId = parseInt(new URLSearchParams(window.location.search).get('id'));

    fetch('../database/accounts.json')
        .then(response => response.json())
        .then(data => {
            const newData = data.users.filter(acc => acc.id !== accountId);

            // Lưu dữ liệu cập nhật lại vào tệp JSON (điều này cần backend để xử lý thao tác ghi)
            // Phần này chỉ là mô phỏng, bạn cần một server backend để xử lý trong ứng dụng thực tế.
            console.log('Account deleted:', accountId);
        })
        .catch(error => console.error('Error deleting account:', error));
}

function goBack() {
    window.location.href = 'admin.html';
}
