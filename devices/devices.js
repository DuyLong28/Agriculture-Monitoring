document.addEventListener('DOMContentLoaded', loadDevices);

function loadDevices() {
    fetch('/devices/devices.json')
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
