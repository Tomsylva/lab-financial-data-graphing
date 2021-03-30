const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";
let start;
let end;

const startInput = document.getElementById("start");
const endInput = document.getElementById("end");

axios.get(apiUrl).then((response) => {
  console.log(response.data);
  let axisX = Object.keys(response.data.bpi);
  let axisY = Object.values(response.data.bpi);
  drawChart(axisX, axisY);
});

function getHistoricalData() {
  if (!end || !start) {
    return;
  }
  axios.get(`${apiUrl}?start=${start}?end=${end}`).then((response2) => {
    const labels2 = Object.keys(response2.data.bpi);
    const data2 = Object.values(response2.data.bpi);
    drawChart(labels2, data2);
  });
}

function drawChart(labels, data) {
  const ctx = document.getElementById("myChart");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Bitcoin Price Index",
          data: data,
        },
      ],
    },
  });
}

startInput.onchange = (event) => {
  start = event.target.value;
  getHistoricalData();
};

endInput.onchange = (event) => {
  end = event.target.value;
  getHistoricalData();
};
