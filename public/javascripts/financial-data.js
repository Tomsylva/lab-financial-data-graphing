axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then((response) => {
    console.log(response.data.bpi);
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: "bar",
      data: {
        datasets: [
          {
            yAxisID: "",
          },
          {},
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  });
