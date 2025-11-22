// // app/dashboard/overview/page.jsx
// import DashboardContainer from "@/components/DashboardContainer";

// export default function OverviewPage() {
//   return (
//     <DashboardContainer title="Overview" subtitle="Dashboard overview">
//      <div>hi</div>
//     </DashboardContainer>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";
import DashboardContainer from "@/components/DashboardContainer";
import apiClient from "@/app/api/client";
import toast from "react-hot-toast";
import { formatCurrency, getChangeColor, tierColors } from "@/utils/helpers";

export default function OverviewPage() {
  const [overview, setOverview] = useState([]);
  const [affiliates, setAffiliates] = useState([]);

  const stats = [
    {
      label: "Total Sales",
      value: formatCurrency(overview?.metrics?.totalSales.value),
      change: "+23%",
      subtext: `${overview?.metrics?.totalSales.change >= 0 ? "+" : ""}${
        overview?.metrics?.totalSales.change || 0
      }% from last month`,
      active: true,
    },
    {
      label: "Total commission",
      value: formatCurrency(overview?.metrics?.totalCommission.value),
      change: "+100%",
      subtext: `${overview?.metrics?.totalCommission.change >= 0 ? "+" : ""}${
        overview?.metrics?.totalCommission.change || 0
      }% from last month`,
      active: false,
    },
    {
      label: "Total sales",
      value: `${overview?.metrics?.totalSalesCount.value || 0}`,
      change: "+3%",
      subtext: `${overview?.metrics?.totalSalesCount.change >= 0 ? "+" : ""}${
        overview?.metrics?.totalSalesCount.change || 0
      }% from last month`,
      active: false,
    },
    {
      label: "Total withdrawal",
      value: formatCurrency(overview?.metrics?.totalWithdrawal.value),
      change: "+23%",
      subtext: `${overview?.metrics?.totalWithdrawal.change >= 0 ? "+" : ""}${
        overview?.metrics?.totalWithdrawal.change || 0
      }% from last month`,
      active: false,
    },
    {
      label: "Total clicks",
      value: `${overview?.metrics?.totalClicks.value || 0}`,
      change: "+2.3%",
      subtext: `${overview?.metrics?.totalClicks.change >= 0 ? "+" : ""}${
        overview?.metrics?.totalClicks.change || 0
      }% from last month`,
      active: false,
    },
  ];

  const chartData = overview?.salesTrend?.map((item) => item.amount) || [];

  const maxValue = Math.max(...chartData);
  const minValue = Math.min(...chartData);
  const range = maxValue - minValue || 1;

  const chartHeight = 200;
  const chartWidth = 1000;
  const pointSpacing = chartWidth / (chartData.length - 1);

  const pathPoints = chartData
    .map((value, index) => {
      const x = index * pointSpacing;
      const y = chartHeight - ((value - minValue) / range) * chartHeight;
      return `${x},${y}`;
    })
    .join(" L ");

  const pathD = `M ${pathPoints}`;

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await apiClient.get("/admin/dashboard/overview");

        const affiliatesWithColors = response.data?.topAffiliates?.map((a) => ({
          ...a,
          tierColor: tierColors[a.tier] || "bg-gray-100 text-gray-700",
        }));

        setOverview(response.data);
        setAffiliates(affiliatesWithColors);
      } catch (error) {
        const message =
          error?.message ||
          error?.response?.data?.message ||
          "Fetch failed — please try again.";

        toast.error(message);
      }
    };

    fetchOverview();
  }, []);

  return (
    <DashboardContainer title="Overview" subtitle="Dashboard overview">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 border border-gray-200"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm text-gray-500">{stat.label}</span>
                {index === 0 && (
                  <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
                )}
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </span>
                {/* <span className="text-sm text-gray-500">{stat.change}</span> */}
              </div>
              {stat.subtext && (
                <div className={`text-xs ${getChangeColor(stat.subtext)}`}>
                  {stat.subtext}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          {/* <div className="mb-4">
            <div className="text-xl font-semibold text-gray-900 mb-1">
              ₦250k
            </div>
          </div> */}

          <div className="relative" style={{ height: "220px" }}>
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500">
              <div>₦250k</div>
              <div>₦150k</div>
              <div>₦100k</div>
              <div>₦50k</div>
            </div>

            {/* Chart area */}
            <div className="ml-12 h-full">
              <svg
                className="w-full h-full"
                viewBox="0 0 1000 220"
                preserveAspectRatio="none"
              >
                <path
                  d={pathD}
                  fill="none"
                  stroke="#000"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            {/* X-axis labels */}
            <div className="absolute bottom-0 left-12 right-0 flex justify-between text-xs text-gray-400 mt-2">
              {[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
              ].map((day) => (
                <span key={day} className="text-[10px]">
                  {day}
                </span>
              ))}
            </div>
          </div>

          <div className="text-xs text-gray-500 mt-2 ml-12">JULY</div>
        </div>

        {/* Top Performing Affiliates Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Top performing affiliate
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Affiliates promoting this product with best results
                </p>
              </div>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                <span>📅</span>
                <span>Last 30 days</span>
                <span>▼</span>
              </button>
            </div>
          </div>

          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
                  Affiliate name
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
                  Target
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
                  Sales
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
                  Commissions
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
                  Tier
                </th>
              </tr>
            </thead>
            <tbody>
              {affiliates.map((affiliate, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {affiliate?.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {affiliate?.target}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {affiliate?.sales}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatCurrency(affiliate.commissions)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${affiliate.tierColor}`}
                    >
                      {affiliate?.tier}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardContainer>
  );
}
