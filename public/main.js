const tableBody = document.getElementById("dataTable");
const dataForExcel = [];

const eventSource = new EventSource("/api/events");

eventSource.onmessage = function (event) {
  const data = JSON.parse(event.data);
  const timestamp = new Date(data.timestamp || Date.now()).toLocaleString(
    "vi-VN",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  );

  const row = document.createElement("tr");
  row.innerHTML = `
      <td>${parseFloat(data.temperature).toFixed(1)} °C</td>
      <td>${parseFloat(data.humidity).toFixed(1)} %</td>
      <td>${timestamp}</td>
    `;
  tableBody.prepend(row);

  dataForExcel.unshift([
    `${data.temperature} °C`,
    `${data.humidity} %`,
    timestamp,
  ]);

  if (tableBody.rows.length > 50) {
    tableBody.deleteRow(50);
    dataForExcel.splice(50, 1);
  }
};

function exportToExcel() {
  const data = [["Temperature", "Humidity", "Timestamp"], ...dataForExcel];
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sensor Data");
  XLSX.writeFile(workbook, "sensor_data.xlsx");
}
