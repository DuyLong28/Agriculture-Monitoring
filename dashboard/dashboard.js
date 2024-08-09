document.addEventListener('DOMContentLoaded', function() {
    // Lấy thông tin tài khoản từ localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (userInfo) {
        const role = userInfo.role; // Lấy vai trò từ thông tin người dùng

        const lockMayBom = document.getElementById('lock-maybom');
        const lockQuatGio = document.getElementById('lock-quatgio');
        const lockLed1 = document.getElementById('lock-led1');
        const lockLed2 = document.getElementById('lock-led2');

        if (role === 'admin' || role === 'staff') {
            if (lockMayBom) lockMayBom.disabled = false;
            if (lockQuatGio) lockQuatGio.disabled = false;
            if (lockLed1) lockLed1.disabled = false;
            if (lockLed2) lockLed2.disabled = false;
        }
    } else {
        console.error('Không có thông tin tài khoản trong localStorage.');
    }
});
