"use client";

import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

// chart settings
defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.borderColor = "#888888"

const chartStyle = {
  width: "50%",
  height: "20rem",
  padding: "16px"
}
const conf_title = {
  display: true,
  align: "start",
  font: { size: 20 },
  color: "#f6f6f6",
  text: "Monthly Work Hours "
}

const conf_tooltip = {
  callbacks: {
    label: function (context) {
      let label = "";
      if (context.parsed.y !== null) {
        label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'CAD' }).format(context.parsed.y);
      }
      return label;
    }
  }
}

const conf_legend = {
  onClick: null
}

export function BarChart({ data }) {
  return (
    <div style={{ ...chartStyle }}>
      <Bar
        data={{
          labels: data.map((data) => data.label),
          datasets: [
            {
              label: "Monthly Work Hours",
              data: data.map((data) => data.value),
              backgroundColor: "#b7fbdf",
              borderRadius: 5,
            },
          ],
        }}
        options={{
          plugins: {
            title: conf_title,
            tooltip: conf_tooltip,
            legend: conf_legend
          },
        }}
      />
    </div>
  )
}