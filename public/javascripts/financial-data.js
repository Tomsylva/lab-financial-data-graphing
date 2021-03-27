let axisX;
let axisY;
let apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";

axios.get(apiUrl).then((response) => {
  console.log(response.data.bpi);
  axisX = Object.keys(response.data.bpi);
  axisY = Object.values(response.data.bpi);
  drawChart(axisX, axisY);
});

function drawChart(labels, data) {
  const ctx = document.getElementById("myChart");
  const myChart = new Chart(ctx, {
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

let toValue;
let fromValue;

const changeDates = () => {
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromValue}&end=${toValue}`
    )
    .then((response) => {
      axisX = Object.keys(response.data.bpi);
      axisY = Object.values(response.data.bpi);
      drawChart(axisX, axisY);
    });
};

const dateFrom = document.getElementById("from");
dateFrom.addEventListener("onclick", () => {
  fromValue = document.getElementById("from").value;
  changeDates();
});

const dateTo = document.getElementById("to");
dateTo.addEventListener("onclick", () => {
  toValue = document.getElementById("to").value;
  changeDates();
});
