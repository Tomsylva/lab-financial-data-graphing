let axisX;
let axisY;
let apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";
let start;
let end;

const startInput = document.getElementById("from");
const endInput = document.getElementById("to");

axios.get(apiUrl).then((response) => {
  console.log(response.data);
  axisX = Object.keys(response.data.bpi);
  axisY = Object.values(response.data.bpi);
  drawChart(axisX, axisY);
});

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

function getHistoricalDate() {
  if (!end || !start) {
    return;
  }
  axios.get(`${apiUrl}?start=${start}?end=${end}`).then((axiosResponse2) => {
    const labels = Object.keys(axiosResponse2.data.bpi);
    const data = Object.values(axiosResponse2.data.bpi);
    drawChart(labels, data);
  });
}

startInput.onchange = (event) => {
  console.log(event.target.value);
  start = event.target.value;
  getHistoricalDate();
};

endInput.onchange = (event) => {
  console.log(event.target.value);
  end = event.target.value;
  getHistoricalDate();
};

// const changeDates = () => {
//   axios
//     .get(
//       `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromValue}&end=${toValue}`
//     )
//     .then((response) => {
//       axisX = Object.keys(response.data.bpi);
//       axisY = Object.values(response.data.bpi);
//       drawChart(axisX, axisY);
//     });
// };

// const dateFrom = document.getElementById("from");
// dateFrom.addEventListener("onclick", () => {
//   fromValue = document.getElementById("from").value;
//   changeDates();
// });

// const dateTo = document.getElementById("to");
// dateTo.addEventListener("onclick", () => {
//   toValue = document.getElementById("to").value;
//   changeDates();
// });
