let axisX;
let axisY;

axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then((response) => {
    // console.log(response.data.bpi);
    axisX = Object.keys(response.data.bpi);
    axisY = Object.values(response.data.bpi);
    drawChart(axisX, axisY);
  });

function drawChart(labels, data) {
  const ctx = document.getElementById("myChart");
  const myChart = new Chart(ctx, {
    type: "bar",
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
