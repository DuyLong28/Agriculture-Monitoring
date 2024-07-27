document.addEventListener('DOMContentLoaded', loadDevices);

function loadDevices() {
    fetch('devices.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('deviceTableBody');
            data.forEach((device, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${device.name}</td>
                    <td>${device.info}</td>
                    <td><img src="${device.image}" title="${device.name}" class="anh"></td>
                `;
                tableBody.appendChild(row);
            });
        });
}

document.getElementById('addDevice').addEventListener('click', function() {
    const form = document.getElementById('addDeviceForm');
    if (form.style.display === 'none') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
});

document.getElementById('addDeviceButton').addEventListener('click', function() {
    const name = document.getElementById('deviceName').value;
    const info = document.getElementById('deviceInfo').value;
    const image = document.getElementById('deviceImage').value;

    if (name && info && image) {
        const tableBody = document.getElementById('deviceTableBody');
        const rowCount = tableBody.rows.length;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${rowCount + 1}</td>
            <td>${name}</td>
            <td>${info}</td>
            <td><img src="${image}" title="${name}" class="anh"></td>
        `;
        tableBody.appendChild(row);

        // Clear the input fields
        document.getElementById('deviceName').value = '';
        document.getElementById('deviceInfo').value = '';
        document.getElementById('deviceImage').value = '';

        // Ẩn form sau khi thêm thiết bị
        document.getElementById('addDeviceForm').style.display = 'none';
    } else {
        alert('Vui lòng điền đầy đủ thông tin.');
    }
});