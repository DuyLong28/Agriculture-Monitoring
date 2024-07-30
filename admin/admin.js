// Kiểm tra trạng thái đăng nhập
/*if (!localStorage.getItem('loggedIn')) {
    window.location.href = '../login/login.html';
}*/

document.addEventListener('DOMContentLoaded', function() {
    loadAccounts();

    document.getElementById('search-fullname').addEventListener('input', searchAccounts);
    document.getElementById('search-username').addEventListener('input', searchAccounts);
    document.getElementById('search-phone').addEventListener('input', searchAccounts);
    document.getElementById('search-email').addEventListener('input', searchAccounts);
});

function loadAccounts() {
    fetch('../database/accounts.json')
        .then(response => response.json())
        .then(data => {
            displayAccounts(data.users);
        })
        .catch(error => console.error('Error loading accounts:', error));
}

function displayAccounts(accounts) {
    const accountList = document.getElementById('account-list');
    accountList.innerHTML = '';

    accounts.forEach((account, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${account.fullName}</td>
            <td>${account.username}</td>
            <td>${account.phone}</td>
            <td>${account.email}</td>
            <td class="edit"><a href="control-panel.html?id=${account.id}">Edit</a></td>
        `;

        accountList.appendChild(row);
    });
}

function searchAccounts() {
    const fullName = document.getElementById('search-fullname').value.toLowerCase();
    const username = document.getElementById('search-username').value.toLowerCase();
    const phone = document.getElementById('search-phone').value.toLowerCase();
    const email = document.getElementById('search-email').value.toLowerCase();

    fetch('../database/accounts.json')
        .then(response => response.json())
        .then(data => {
            const filteredAccounts = data.users.filter(account => { // Cập nhật để sử dụng thuộc tính 'users'
                return (
                    account.fullName.toLowerCase().includes(fullName) &&
                    account.username.toLowerCase().includes(username) &&
                    account.phone.includes(phone) &&
                    account.email.toLowerCase().includes(email)
                );
            });

            displayAccounts(filteredAccounts);
        })
        .catch(error => console.error('Error searching accounts:', error));
}
