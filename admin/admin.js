document.addEventListener('DOMContentLoaded', async function() {
    // Load danh sách tài khoản khi trang được tải
    await loadAccounts();

    // Thêm sự kiện tìm kiếm
    document.getElementById('search-fullname').addEventListener('input', searchAccounts);
    document.getElementById('search-username').addEventListener('input', searchAccounts);
    document.getElementById('search-phone').addEventListener('input', searchAccounts);
    document.getElementById('search-email').addEventListener('input', searchAccounts);
});

let allAccounts = []; // Biến lưu trữ toàn bộ tài khoản

async function loadAccounts() {
    try {
        const response = await fetch('../database/list-account.php'); // Đường dẫn đến file PHP của bạn
        if (!response.ok) {
            throw new Error(`Mã lỗi: ${response.status}`);
        }

        const text = await response.text(); // Đọc phản hồi dưới dạng văn bản
        console.log('Dữ liệu tải về:', text); // Log dữ liệu để kiểm tra

        const data = JSON.parse(text); // Phân tích dữ liệu JSON
        if (Array.isArray(data.users)) {
            allAccounts = data.users; // Lưu tất cả tài khoản
            displayAccounts(allAccounts); // Hiển thị danh sách tài khoản
        } else {
            console.error('Dữ liệu không phải là một mảng:', data.users);
        }
    } catch (error) {
        console.error('Lỗi khi tải danh sách tài khoản:', error);
    }
}

function displayAccounts(accounts) {
    if (!Array.isArray(accounts)) {
        console.error('Dữ liệu tài khoản không phải là một mảng:', accounts);
        return;
    }

    const accountList = document.getElementById('account-list');
    accountList.innerHTML = '';

    accounts.forEach(account => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${account.id}</td>
            <td>${account.fullName}</td>
            <td>${account.username}</td>
            <td>${account.phone}</td>
            <td>${account.email}</td>
            <td class="edit"><a href="control-panel.php?id=${account.id}">Edit</a></td>
        `;

        accountList.appendChild(row);
    });
}

function searchAccounts() {
    // Chỉ thực hiện tìm kiếm nếu allAccounts đã được tải
    if (!Array.isArray(allAccounts)) {
        console.error('Dữ liệu tài khoản không phải là một mảng:', allAccounts);
        return;
    }

    const fullName = document.getElementById('search-fullname').value.toLowerCase();
    const username = document.getElementById('search-username').value.toLowerCase();
    const phone = document.getElementById('search-phone').value.toLowerCase();
    const email = document.getElementById('search-email').value.toLowerCase();

    const filteredAccounts = allAccounts.filter(account => {
        return (
            account.fullName.toLowerCase().includes(fullName) &&
            account.username.toLowerCase().includes(username) &&
            account.phone.toLowerCase().includes(phone) &&
            account.email.toLowerCase().includes(email)
        );
    });

    displayAccounts(filteredAccounts);
}
