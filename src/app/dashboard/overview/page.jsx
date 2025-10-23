// // app/dashboard/overview/page.jsx
// import DashboardContainer from "@/components/DashboardContainer";
 

// export default function OverviewPage() {
//   return (
//     <DashboardContainer title="Overview" subtitle="Dashboard overview">
//      <div>hi</div>
//     </DashboardContainer>
//   );
// }

import React from 'react';
import DashboardContainer from "@/components/DashboardContainer";

export default function OverviewPage() {
  const stats = [
    {
      label: 'Total Sales',
      value: '₦120,000',
      change: '+23%',
      subtext: '+3.3% from last month',
      active: true
    },
    {
      label: 'Total commission',
      value: '₦120,000',
      change: '+100%',
      subtext: '',
      active: false
    },
    {
      label: 'Total sales',
      value: '1.2%',
      change: '+3%',
      subtext: '',
      active: false
    },
    {
      label: 'Total withdrawal',
      value: '₦124,000',
      change: '+23%',
      subtext: '',
      active: false
    },
    {
      label: 'Total clicks',
      value: '1000',
      change: '+2.3%',
      subtext: '',
      active: false
    }
  ];

  const affiliates = [
    { name: 'Wale adeleke', target: '1/20', sales: 128, commission: '₦22,000', tier: 'Tier 1', tierColor: 'bg-indigo-100 text-indigo-700' },
    { name: 'Wale adeleke', target: '1/200', sales: 128, commission: '₦22,000', tier: 'Tier 2', tierColor: 'bg-purple-100 text-purple-700' },
    { name: 'Wale adeleke', target: '200/200', sales: 128, commission: '₦22,000', tier: 'Tier 5', tierColor: 'bg-emerald-100 text-emerald-700' },
    { name: 'Wale adeleke', target: '5,240', sales: 128, commission: '₦22,000', tier: 'Tier 2', tierColor: 'bg-purple-100 text-purple-700' }
  ];

  // Generate chart path
  const chartData = [
    100, 120, 140, 160, 180, 160, 140, 100, 80, 90, 120, 160, 200, 220, 240, 230, 210, 180, 150, 120, 100, 90, 110, 140, 160, 170, 150, 130, 110, 100, 90
  ];

  const maxValue = Math.max(...chartData);
  const minValue = Math.min(...chartData);
  const range = maxValue - minValue;
  const chartHeight = 200;
  const chartWidth = 1000;
  const pointSpacing = chartWidth / (chartData.length - 1);

  const pathPoints = chartData.map((value, index) => {
    const x = index * pointSpacing;
    const y = chartHeight - ((value - minValue) / range) * chartHeight;
    return `${x},${y}`;
  }).join(' L ');

  const pathD = `M ${pathPoints}`;

  return (
    <DashboardContainer title="Overview" subtitle="Dashboard overview">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm text-gray-500">{stat.label}</span>
                {index === 0 && (
                  <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
                )}
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-semibold text-gray-900">{stat.value}</span>
                <span className="text-sm text-gray-500">{stat.change}</span>
              </div>
              {stat.subtext && (
                <div className="text-xs text-green-600">{stat.subtext}</div>
              )}
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="mb-4">
            <div className="text-xl font-semibold text-gray-900 mb-1">₦250k</div>
          </div>
          
          <div className="relative" style={{ height: '220px' }}>
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500">
              <div>₦250k</div>
              <div>₦150k</div>
              <div>₦100k</div>
              <div>₦50k</div>
            </div>

            {/* Chart area */}
            <div className="ml-12 h-full">
              <svg className="w-full h-full" viewBox="0 0 1000 220" preserveAspectRatio="none">
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
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map(day => (
                <span key={day} className="text-[10px]">{day}</span>
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
                <h2 className="text-lg font-semibold text-gray-900">Top performing affiliate</h2>
                <p className="text-sm text-gray-500 mt-1">Affiliates promoting this product with best results</p>
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
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Affiliate name</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Target</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Sales</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Commissions</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Tier</th>
              </tr>
            </thead>
            <tbody>
              {affiliates.map((affiliate, index) => (
                <tr key={index} className="border-b border-gray-100 last:border-b-0">
                  <td className="px-6 py-4 text-sm text-gray-900">{affiliate.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{affiliate.target}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{affiliate.sales}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{affiliate.commission}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${affiliate.tierColor}`}>
                      {affiliate.tier}
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