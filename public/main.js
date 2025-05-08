async function fetchData() {
  const response = await fetch("/api/sensor");
  const data = await response.json();

  const tableBody = document.getElementById("dataTable");
  tableBody.innerHTML = "";
  data.forEach((record) => {
    const row = `<tr>
          <td>${record.temperature} °C</td>
          <td>${record.humidity} %</td>
          <td>${new Date(record.timestamp).toLocaleString()}</td>
        </tr>`;
    tableBody.innerHTML += row;
  });
}

setInterval(fetchData, 2000);
fetchData();

function exportToExcel() {
  const table = document.getElementById("dataTable");
  const rows = table.getElementsByTagName("tr");
  const data = [];

  data.push(["Temperature", "Humidity", "Timestamp"]);

  for (let row of rows) {
    const cells = row.getElementsByTagName("td");
    const rowData = [];
    for (let cell of cells) {
      rowData.push(cell.textContent);
    }
    data.push(rowData);
  }

  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sensor Data");

  XLSX.writeFile(wb, "sensor_data.xlsx");
}
