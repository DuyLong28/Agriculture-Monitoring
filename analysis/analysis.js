//Dữ liệu -----------------------------------------------------------------------------------------------------------------------------------
    // Biến toàn cục để lưu trữ giá trị nhiệt độ và độ ẩm
    let nhietDo = 28; // Giả sử nhiệt độ ban đầu là 28°C
    let doAm = 60;   // Giả sử độ ẩm ban đầu là 60%
  
    // Hàm lấy thời gian thực
    function getCurrentTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
      const date = now.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    }

    // Hàm thêm dữ liệu vào bảng với thời gian thực
    function addDataToTable(data) {
      const { doAmDat } = data;
      const tbody = document.querySelector('.data-table tbody');
      const row = tbody.insertRow(1);
      const cellThoiGian = row.insertCell(0);
      const cellNhietDo = row.insertCell(1);
      const cellDoAm = row.insertCell(2);
      const cellDoAmDat = row.insertCell(3);

      // Cộng thêm 1 đơn vị cho nhiệt độ và độ ẩm mỗi lần cập nhật
      nhietDo += 1;
      doAm += 1;

      cellThoiGian.innerHTML = getCurrentTime();
      cellNhietDo.innerHTML = `${nhietDo}°C`;
      cellDoAm.innerHTML = `${doAm}%`;
      cellDoAmDat.innerHTML = `${doAmDat}%`;
    }

  // Đoạn mã này chỉ là ví dụ và cần được thay thế bằng cách lấy dữ liệu thực tế
    function fetchDataPeriodically() {
      // Thực hiện lấy dữ liệu từ hệ thống hoặc nguồn dữ liệu khác ở đây
      // Ví dụ:
      const sampleData = {
          thoiGian: "2023-10-27 08:00",
          doAmDat: 30
      };

      addDataToTable(sampleData);
  }

    // Cập nhật dữ liệu sau mỗi khoảng thời gian
    setInterval(fetchDataPeriodically, 1000); // Cập nhật dữ liệu sau mỗi x giây (x000 ms)

    // Tạo các trường tìm kiếm
    const searchThoiGian = document.getElementById('searchThoiGian');
    const searchNhietDo = document.getElementById('searchNhietDo');
    const searchDoAm = document.getElementById('searchDoAm');
    const searchDoAmDat = document.getElementById('searchDoAmDat');

    // Lắng nghe sự kiện khi người dùng nhấn nút tìm kiếm
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', filterTable);

    // Hàm bộ lọc
    function filterTable() {
      const filterThoiGian = searchThoiGian.value.toLowerCase();
      const filterNhietDo = searchNhietDo.value.toLowerCase();
      const filterDoAm = searchDoAm.value.toLowerCase();
      const filterDoAmDat = searchDoAmDat.value.toLowerCase();

      const rows = document.querySelectorAll('.data-table tbody tr');

      rows.forEach(row => {
        const thoiGian = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const nhietDo = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
        const doAm = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
        const doAmDat = row.querySelector('td:nth-child(5)').textContent.toLowerCase();

        const thoiGianMatch = thoiGian.includes(filterThoiGian);
        const nhietDoMatch = nhietDo.includes(filterNhietDo);
        const doAmMatch = doAm.includes(filterDoAm);
        const doAmDatMatch = doAmDat.includes(filterDoAmDat);

      if (thoiGianMatch && nhietDoMatch && doAmMatch && doAmDatMatch) {
        row.classList.remove('hide-row'); // Loại bỏ lớp hide-row nếu điều kiện lọc đúng
      } else {
        row.classList.add('hide-row'); // Thêm lớp hide-row nếu điều kiện lọc sai
      }
    });
  }
    // Lắng nghe sự kiện khi người dùng thay đổi giá trị trường tìm kiếm
    searchThoiGian.addEventListener('input', handleSearchInput);
    searchNhietDo.addEventListener('input', handleSearchInput);
    searchDoAm.addEventListener('input', handleSearchInput);
    searchDoAmDat.addEventListener('input', handleSearchInput);
    
    // Hàm xử lý khi giá trị trường tìm kiếm thay đổi
    function handleSearchInput() {
      // Kiểm tra giá trị của tất cả các trường tìm kiếm
      const thoiGianValue = searchThoiGian.value.trim().toLowerCase();
      const nhietDoValue = searchNhietDo.value.trim().toLowerCase();
      const doAmValue = searchDoAm.value.trim().toLowerCase();
      const doAmDatValue = searchDoAmDat.value.trim().toLowerCase();

      // Kiểm tra xem tất cả các trường tìm kiếm có giá trị trống không
      if (thoiGianValue === '' && nhietDoValue === '' && doAmValue === '' && doAmDatValue === '') {
        // Nếu tất cả trống, xóa lọc và hiển thị tất cả các dòng
        const rows = document.querySelectorAll('.data-table tbody tr');
        rows.forEach(row => {
          row.classList.remove('hide-row');
        });
      }
    }
    searchThoiGian.addEventListener("keyup", handleEnterKey);
    searchNhietDo.addEventListener("keyup", handleEnterKey);
    searchDoAm.addEventListener("keyup", handleEnterKey);
    searchDoAmDat.addEventListener("keyup", handleEnterKey);

    function handleEnterKey(e) {
      if (e.key === "Enter") {
        filterTable();
      }
    }

document.addEventListener("DOMContentLoaded", function () {
  const giamsat = document.getElementById("giamsat");
  const phantich = document.getElementById("phantich");
  const dateRangeSelector = document.getElementById("dateRange");
  // Khai báo nhãn chung
  let sharedLabels = null;

  const xgiamsat = Array.from({ length: 24 }, (_, i) => i.toString());
  const xtuan = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"];
  const xthang = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const xnam = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  const temperatureChart = new Chart(document.getElementById("NhietDo"), {
    type: "line",
    data: {
      labels: sharedLabels, // Sử dụng sharedLabels
      datasets: [
        {
          label: "Nhiệt Độ",
          data: [],
          borderColor: "rgba(255, 0, 0, 1)",
          fill: false,
        },
      ],
    },
  });

  const soilMoistureChart = new Chart(document.getElementById("DoAmDat"), {
    type: "line",
    data: {
      labels: sharedLabels, // Sử dụng sharedLabels
      datasets: [
        {
          label: "Độ ẩm Đất",
          data: [],
          borderColor: "rgba(139, 69, 19, 1)",
          fill: false,
        },
      ],
    },
  });

  const airHumidityChart = new Chart(document.getElementById("DoAmKK"), {
    type: "line",
    data: {
      labels: sharedLabels, // Sử dụng sharedLabels
      datasets: [
        {
          label: "Độ ẩm Không Khí",
          data: [],
          borderColor: "rgba(0, 0, 255, 1)",
          fill: false,
        },
      ],
    },
  });

  function updateChart(selectedRange) {
    if (phantich) {
      // Cập nhật biểu đồ trang "phantich" (Tuần, Tháng, Năm)
      if (selectedRange === "week") {
        sharedLabels = xtuan;
      } else if (selectedRange === "month") {
        sharedLabels = xthang;
      } else if (selectedRange === "year") {
        sharedLabels = xnam;
      }

      // Cập nhật nhãn cho cả 3 biểu đồ trang "phantich"
      temperatureChart.data.labels = sharedLabels;
      soilMoistureChart.data.labels = sharedLabels;
      airHumidityChart.data.labels = sharedLabels;

      // Cập nhật biểu đồ
      temperatureChart.update();
      soilMoistureChart.update();
      airHumidityChart.update();
    }
  }

  // Khởi tạo biểu đồ ban đầu dựa trên trang web
  if (giamsat) {
    // Cập nhật biểu đồ cho trang "giamsat"
    // Ví dụ: fetch và cập nhật dữ liệu của giờ hiện tại
    updateChart("today");
  } else if (phantich) {
    // Cập nhật biểu đồ cho trang "phantich" dựa trên giá trị mặc định của dateRangeSelector
    dateRangeSelector.value = "week"; // Đặt giá trị mặc định là "week"
    updateChart("week");
  }

  // Sử dụng sự kiện change để cập nhật biểu đồ khi khoảng thời gian thay đổi.
  if (phantich) {
    dateRangeSelector.addEventListener("change", function () {
      const selectedRange = dateRangeSelector.value;
      updateChart(selectedRange);
    });
  }
});