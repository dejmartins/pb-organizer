'use client'
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Dummy data
const dummyData = {
  weekly: {
    sales: [50, 80, 30, 120, 70, 40, 110],
    purchases: [40, 90, 60, 130, 50, 100, 60],
  },
  monthly: {
    sales: [500, 450, 800, 750],
    purchases: [600, 650, 500, 400],
  },
  yearly: {
    sales: [7000, 5500, 6000, 8500, 7500, 9500, 8000, 2000, 6000, 3000, 1500, 9000],
    purchases: [5000, 7000, 6500, 9000, 8000, 6000, 7500, 1200, 3400, 8000, 3400, 8200],
  },
};

export default function Analytics() {
  const [filterType, setFilterType] = useState("sales");
  const [timeRange, setTimeRange] = useState("weekly");

  const labels = {
    weekly: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    monthly: ["Week 1", "Week 2", "Week 3", "Week 4"],
    yearly: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  };

  const data = {
    // @ts-ignore
    labels: labels[timeRange],
    datasets: [
      {
        label: filterType === "sales" ? "Sales" : "Purchases",
        // @ts-ignore
        data: dummyData[timeRange][filterType],
        borderColor: "#E91B41",
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 10,
      },
    ],
  };

  // Chart options with line shadow
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        tooltip: {
          enabled: true,
          callbacks: {
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(200, 200, 200, 0.1)',
          borderDash: [5, 5],
        },
      },
      y: {
        grid: {
          color: 'rgba(200, 200, 200, 0.1)',
          borderDash: [5, 5],
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    }
  };

  useEffect(() => {
    const chart = ChartJS.getChart('myChart');

    // if (chart) {
    //   chart.options.plugins.beforeDraw = function (chart: any) {
    //     const ctx = chart.ctx;
    //     ctx.save();
    //     ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
    //     ctx.shadowBlur = 10;
    //     ctx.shadowOffsetX = 0;
    //     ctx.shadowOffsetY = 4;
    //     ctx.restore();
    //   };
    // }
  }, [timeRange, filterType]);

  return (
    <div className="">
      <h3 className="text-2xl font-bold mb-4">Dashboard Analytics</h3>

      <div className="border rounded-[20px]">
        <div className="flex gap-6 mb-6 border-0 border-b p-6">
          <div>
            <div className="flex gap-2 items-center">
              <label className="mr-2 font-[600] text-[16px]">Filter by:</label>
              <button
                className={`px-4 rounded-md border border-[#DDE0E3] ${filterType === "sales" ? "bg-[var(--pb-c-light-red)] text-[var(--pb-c-red)] font-[600]" : ""}`}
                onClick={() => setFilterType("sales")}
              >
                Sales
              </button>
              <button
                className={`px-4 rounded-md border border-[#DDE0E3] ${filterType === "purchases" ? "bg-[var(--pb-c-light-red)] text-[var(--pb-c-red)] font-[600]" : ""}`}
                onClick={() => setFilterType("purchases")}
              >
                Ticket Purchase
              </button>
            </div>
          </div>

          <div>
            <div className="flex gap-2 items-center">
              <label className="mr-2 font-[600] text-[16px]">Show by:</label>
              <button
                className={`px-4 rounded-md border border-[#DDE0E3] ${timeRange === "weekly" ? "bg-[var(--pb-c-light-red)] text-[var(--pb-c-red)] font-[600]" : ""}`}
                onClick={() => setTimeRange("weekly")}
              >
                Weekly
              </button>
              <button
                className={`px-4 rounded-md border border-[#DDE0E3] ${timeRange === "monthly" ? "bg-[var(--pb-c-light-red)] text-[var(--pb-c-red)] font-[600]" : ""}`}
                onClick={() => setTimeRange("monthly")}
              >
                Monthly
              </button>
              <button
                className={`px-4 rounded-md border border-[#DDE0E3] ${timeRange === "yearly" ? "bg-[var(--pb-c-light-red)] text-[var(--pb-c-red)] font-[600]" : ""}`}
                onClick={() => setTimeRange("yearly")}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        <div style={{ height: '400px' }} className="p-6">
          <Line data={data} options={options} id="myChart" />
        </div>
      </div>
    </div>
  );
};
