document.addEventListener('DOMContentLoaded', function() {
    const role = localStorage.getItem('role');
    const lockMayBom = document.getElementById('lock-maybom');
        if (lockMayBom && (role === 'admin' || role === 'staff')) {
            lockMayBom.disabled = false;
        }
    const lockQuatGio = document.getElementById('lock-quatgio');
        if (lockQuatGio && (role === 'admin' || role === 'staff')) {
            lockQuatGio.disabled = false;
        }
    const lockLed1 = document.getElementById('lock-led1');
        if (lockLed1 && (role === 'admin' || role === 'staff')) {
            lockLed1.disabled = false;
        }
    const lockLed2 = document.getElementById('lock-led2');
        if (lockLed2 && (role === 'admin' || role === 'staff')) {
            lockLed2.disabled = false;
        }
});