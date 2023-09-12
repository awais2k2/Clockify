import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { formatTime } from "../Tracker/tracker";

const PieChart = ({ data, totaltime, topProject }) => {
  const [datatoshow, setdatatoshow] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const formatData = (data) => {
    const labels = data.labels;
    const dataValues = data.datasets[0].data;
    const backgroundColors = data.datasets[0].backgroundColor;
    const total = dataValues.reduce((acc, val) => acc + val, 0);

    let maxPercentage = -1;
    let labelWithMaxPercentage = "";

    function TopProject() {
      labels.map((label, index) => {
        const value = dataValues[index];
        const percentage = ((value / total) * 100).toFixed(2);

        if (parseFloat(percentage) > maxPercentage) {
          maxPercentage = parseFloat(percentage);
          labelWithMaxPercentage = label;
        }
      });
      topProject(labelWithMaxPercentage);
    }
    TopProject();
    return labels.map((label, index) => {
      const value = dataValues[index];
      const percentage = ((value / total) * 100).toFixed(2);
      const background = backgroundColors[index];
      const afterStyles = {
        content: '""',
        position: "absolute",
        top: "0",
        left: "0",
        width: `${percentage}%`,
        height: "100%",
        backgroundColor: background,
        zIndex: "50",
        transition: "all 0.3s ease-in-out",
      };
      return (
        <div key={index} className="flex gap-[10px] items-center">
          <div>{label}</div>
          <div>{formatTime(value * 3600)}</div>
          <div className="bg-gray-200 relative w-[200px] h-[30px] z-10">
            <div
              className="absolute inset-0"
              style={afterStyles}
              aria-hidden="true"></div>
          </div>
          <div>{percentage}%</div>
        </div>
      );
    });
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create an object to store grouped data by label
    const groupedData = {};

    for (const date in data) {
      const reports = data[date]?.reports;
      reports.forEach((report) => {
        let label = `${report.project.name} ${
          report.task ? `-${report.task.name}` : ""
        }`;
        label = label.replace(/\s+/g, "");
        const color = report.project.statuscolor;
        const value = report.totaltime / 60 / 60;

        if (!groupedData[label]) {
          groupedData[label] = {
            totaltime: 0,
            backgroundColor: color,
          };
        }

        groupedData[label].totaltime += value;
      });
    }

    // Convert groupedData to arrays for chart rendering
    const labels = Object.keys(groupedData);
    const dataPoints = labels.map((label) => groupedData[label].totaltime);
    const backgroundColors = labels.map(
      (label) => groupedData[label].backgroundColor
    );

    const chartData = {
      labels: labels,
      datasets: [
        {
          data: dataPoints,
          backgroundColor: backgroundColors,
          borderWidth: 2,
        },
      ],
    };
    setdatatoshow(chartData);

    const totalHours = dataPoints.reduce((acc, val) => acc + val, 0) * 3600;
    totaltime(totalHours.toFixed(2));

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        doughnutlabel: {
          labels: [
            {
              text: `${totalHours.toFixed(2)} hrs`,
              font: {
                size: totalHours < 10 ? 30 : 24,
              },
            },
          ],
        },
        tooltip: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || "";
                const value = context.parsed || 0;
                const dataset = context.dataset || {};
                const total = dataset.data.reduce((acc, val) => acc + val, 0);
                const percent = ((value / total) * 100).toFixed(2);
                return `${label}: ${value.toFixed(3)} hours (${percent}%)`;
              },
            },
          },
        },
      },
    });
  }, [data]);
  const viusalData = datatoshow && formatData(datatoshow);

  return (
    <div className="flex flex-wrap justify-center gap-[30px] mt-[30px] items-center ">
      <div>
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="flex flex-col gap-[20px] mr-[20px] items-center ">
        {viusalData}
      </div>
    </div>
  );
};

export default PieChart;
