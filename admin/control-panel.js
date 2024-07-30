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
            const account = data.find(acc => acc.id === parseInt(id));
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
            const index = data.findIndex(acc => acc.id === account.id);
            if (index !== -1) {
                data[index] = account;
            } else {
                data.push(account);
            }

            // Save the updated data back to the JSON file (this requires a backend to handle the write operation)
            // This part is just a simulation, you need a backend server to handle this in a real application.
            console.log('Account saved:', account);
        })
        .catch(error => console.error('Error saving account:', error));
}

function deleteAccount() {
    const accountId = parseInt(new URLSearchParams(window.location.search).get('id'));

    fetch('../database/accounts.json')
        .then(response => response.json())
        .then(data => {
            const newData = data.filter(acc => acc.id !== accountId);

            // Save the updated data back to the JSON file (this requires a backend to handle the write operation)
            // This part is just a simulation, you need a backend server to handle this in a real application.
            console.log('Account deleted:', accountId);
        })
        .catch(error => console.error('Error deleting account:', error));
}

function goBack() {
    window.location.href = 'admin.html';
}
