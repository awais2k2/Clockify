import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function formatDate(dateString) {
  const dateObject = new Date(dateString);

  const day = dateObject.toLocaleDateString(undefined, { weekday: "short" }); // Short day name
  const month = dateObject.toLocaleDateString(undefined, { month: "short" }); // Short month name
  const date = dateObject.getDate();

  return `${day},${month} ${date}`;
}

const MyChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    let labels = Object.keys(data);
    labels = labels.sort();
    const datasets = [];

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    let dataset;

    labels.forEach((date, index) => {
      let some = Array(labels.length).fill(0);
      const reports = data[date]?.reports;
      reports &&
        reports.forEach((report, ind) => {
          const totalHours = report.totaltime / 60 / 60;
          some[index] = totalHours;
          dataset = {
            label: report.project.name,
            data: some,
            backgroundColor: report.project.statuscolor,
            borderWidth: 1,
          };
          datasets.push(dataset);
          some = Array(labels.length).fill(0);
        });
    });

    const modifiedlabels = labels.map((dateString) => formatDate(dateString));
    const chartData = {
      labels: modifiedlabels,
      datasets: datasets,
    };

    const options = {
      scales: {
        x: {
          title: {
            display: true,
            text: "Date",
          },
          stacked: true,
        },
        y: {
          title: {
            display: true,
            text: "Total Time (h)",
          },
          stacked: true,
          ticks: {
            callback: (value) => value + "h",
          },
        },
      },
      maintainAspectRatio: false, // Disable aspect ratio to make it responsive
      responsive: true, // Enable responsiveness};
    };

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: options,
    });
  }, [data]);

  return (
    <div className="h-[400px]">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default MyChart;
