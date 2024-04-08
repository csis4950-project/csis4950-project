"use client";

import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import React, { useLayoutEffect, useState } from "react";

// chart settings
defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.borderColor = "#888888"

const chartStyle = {
  width: "100%",
  height: "20rem",
  padding: "16px"
}

const conf_title = {
  display: true,
  align: "start",
  font: { size: 20 },
  color: "#f6f6f6",
  text: "Monthly Earnings in CAD"
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

export function LineChart({ data }) {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return (
    <div style={{ ...chartStyle }}>
      <Line
        data={{
          labels: data.map((data) => data.label),
          datasets: [
            {
              label: "Monthly Earnings",
              data: data.map((data) => data.value),
              backgroundColor: "#fddd8a",
              borderColor: "#fddd8a"
            },
          ],
        }}
        options={{
          elements: {
            line: {
              tension: 0.5,
            },
          },
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
