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
  text: "Earnings by Department",
}

const conf_tooltip = {
  callbacks: {
    label: function (context) {
      let label = "";
      console.log('context.parsed.y', context);
      if (context.parsed !== null) {
        label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'CAD' }).format(context.parsed);
      }
      return label;
    }
  }
}

const conf_legend = {
  onClick: null
}

const colors = [
  "#fddd8a", "#b7fbdf", "#9db4ff", "#ef4444"
]

export function DoughnutChart({ data }) {
  return (
    <div style={{ ...chartStyle }}>
      <Doughnut
        data={{
          labels: data.map((data) => data.label),
          datasets: [
            {
              label: "Department",
              data: data.map((data) => data.value),
              backgroundColor: colors,
              borderColor: colors,
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