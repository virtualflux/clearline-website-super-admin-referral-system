'use client';

import DashboardContainer from '@/components/DashboardContainer';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { Calendar, ChevronDown, ChevronLeft } from 'lucide-react';

 
const formatNGN = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);
};
 
const affiliateData = {
  1: {
    name: 'Sarah Johnson',
    email: 'Sarah.Johnson@gmail.com',
    joined: '01/01/2025',
    status: 'Active',
    totalSales: 120000,
    salesChange: '+23%',
    salesLastMonth: '+3.3%',
    totalCommission: 120000,
    commissionChange: '+100%',
    totalSalesRate: '1.2%',
    salesRateChange: '+3%',
    totalWithdrawal: 124000,
    withdrawalChange: '+23%',
    totalClicks: 1000,
    clicksChange: '+2.3%',
    products: [
      { name: 'Kia Kia plan', clicks: 5240, conversions: 128, commission: 22000, rate: '2.44%' },
      { name: 'Bronze', clicks: 5240, conversions: 128, commission: 22000, rate: '2.44%' },
      { name: 'Silver', clicks: 5240, conversions: 128, commission: 22000, rate: '2.44%' },
      { name: 'Platinum', clicks: 5240, conversions: 128, commission: 22000, rate: '2.44%' },
    ],
  },
};

export default function AffiliateDetail() {
  const { id } = useParams();
  const router = useRouter();
  const data = affiliateData[id] || null;

  if (!data) {
    return (
      <DashboardContainer>
        <div className="p-8 text-center text-gray-500">Affiliate not found</div>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <div className="p-8 bg-gray-50 min-h-screen">
        {/* Breadcrumb + Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <button onClick={() => router.back()} className="flex items-center space-x-1 hover:text-gray-900">
              <ChevronLeft className="w-4 h-4" />
              <span>{data.name}</span>
            </button>
            <span>/</span>
            <span>Affiliate details</span>
          </div>

          <div className="flex items-center space-x-3">
            <select className="px-4 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Actions</option>
            </select>
            <button className="px-4 py-2 text-sm text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              Suspend
            </button>
            <button className="px-4 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              Delete profile
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{data.name}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <span className="flex items-center">
                  Email: {data.email}
                </span>
                <span>•</span>
                <span className="flex items-center">
                  Joined {data.joined}
                </span>
              </div>
            </div>
            <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
              {data.status}
            </span>
          </div>
        </div>

        {/* Performance Overview + Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">Performance Overview</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Last 30 days</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-5 gap-6 mb-8">
            {/* Total Sales */}
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Sales</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatNGN(data.totalSales)}
                <span className="ml-1 text-sm text-green-600">{data.salesChange}</span>
              </p>
              <p className="text-xs text-gray-500">{data.salesLastMonth} from last month</p>
            </div>

            {/* Total Commission */}
            <div className="text-center">
              <p className="text-sm text-gray-600">Total commission</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatNGN(data.totalCommission)}
                <span className="ml-1 text-sm text-green-600">{data.commissionChange}</span>
              </p>
            </div>

            {/* Total Sales (Rate) */}
            <div className="text-center">
              <p className="text-sm text-gray-600">Total sales</p>
              <p className="text-2xl font-semibold text-gray-900">
                {data.totalSalesRate}
                <span className="ml-1 text-sm text-green-600">{data.salesRateChange}</span>
              </p>
            </div>

            {/* Total Withdrawal */}
            <div className="text-center">
              <p className="text-sm text-gray-600">Total withdrawal</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatNGN(data.totalWithdrawal)}
                <span className="ml-1 text-sm text-green-600">{data.withdrawalChange}</span>
              </p>
            </div>

            {/* Total Clicks */}
            <div className="text-center">
              <p className="text-sm text-gray-600">Total clicks</p>
              <p className="text-2xl font-semibold text-gray-900">
                {data.totalClicks.toLocaleString()}
                <span className="ml-1 text-sm text-green-600">{data.clicksChange}</span>
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="relative h-64 bg-gray-50 rounded-lg overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 800 250">
              {/* Grid lines */}
              {[50, 100, 150, 200].map((y) => (
                <line key={y} x1="50" y1={y} x2="750" y2={y} stroke="#E5E7EB" strokeWidth="1" />
              ))}
              {/* Y-axis labels */}
              {['₦250k', '₦150k', '₦100k', '₦50k'].map((label, i) => (
                <text key={label} x="30" y={50 + i * 50} className="text-xs fill-gray-500">
                  {label}
                </text>
              ))}
              {/* X-axis */}
              <text x="50" y="230" className="text-xs fill-gray-500">JULY</text>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <text key={d} x={50 + (d - 1) * 22.5} y="230" className="text-xs fill-gray-500">
                  {d}
                </text>
              ))}
              {/* Line */}
              <path
                d="M 50 150 Q 100 80, 150 120 Q 200 160, 250 140 Q 300 100, 350 130 Q 400 160, 450 145 Q 500 110, 550 130 Q 600 150, 650 135 Q 700 120, 750 140"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Products Performance */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Products performance</h3>
              <p className="text-sm text-gray-600">Products this affiliate promote</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Last 30 days</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commissions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.products.map((p, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.clicks.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.conversions}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatNGN(p.commission)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}