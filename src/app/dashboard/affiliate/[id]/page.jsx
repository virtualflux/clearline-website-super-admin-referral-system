'use client'
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown, ArrowLeft, Calendar } from 'lucide-react';
import DashboardContainer from '@/components/DashboardContainer';

export default function AffiliateDetailsPage() {
  const [timeRange, setTimeRange] = useState('Last 30 days');
  const [showActions, setShowActions] = useState(false);

  // Mock data for the affiliate
  const affiliate = {
    id: 1,
    name: 'Sarah Johson',
    email: 'Sarah.Johson@gmail.com',
    joinDate: '01/01/2025',
    status: 'Active'
  };

  // Stats data
  const stats = [
    {
      label: 'Total Sales',
      value: '₦120,000',
      change: '+23%',
      subText: '+3.3% from last month',
      isPositive: true,
      isHighlighted: true
    },
    {
      label: 'Total commission',
      value: '₦120,000',
      change: '+100%',
      isPositive: true,
      isHighlighted: false
    },
    {
      label: 'Total sales',
      value: '1.2%',
      change: '+3%',
      isPositive: true,
      isHighlighted: false
    },
    {
      label: 'Total withdrawal',
      value: '₦124,000',
      change: '+23%',
      isPositive: true,
      isHighlighted: false
    },
    {
      label: 'Total clicks',
      value: '1000',
      change: '+2.3%',
      isPositive: true,
      isHighlighted: false
    }
  ];

  // Chart data
  const chartData = [
    { day: 1, value: 100000 },
    { day: 2, value: 120000 },
    { day: 3, value: 115000 },
    { day: 4, value: 180000 },
    { day: 5, value: 160000 },
    { day: 6, value: 140000 },
    { day: 7, value: 100000 },
    { day: 8, value: 80000 },
    { day: 9, value: 90000 },
    { day: 10, value: 110000 },
    { day: 11, value: 130000 },
    { day: 12, value: 150000 },
    { day: 13, value: 170000 },
    { day: 14, value: 160000 },
    { day: 15, value: 180000 },
    { day: 16, value: 200000 },
    { day: 17, value: 190000 },
    { day: 18, value: 170000 },
    { day: 19, value: 150000 },
    { day: 20, value: 140000 },
    { day: 21, value: 130000 },
    { day: 22, value: 140000 },
    { day: 23, value: 160000 },
    { day: 24, value: 180000 },
    { day: 25, value: 200000 },
    { day: 26, value: 190000 },
    { day: 27, value: 180000 },
    { day: 28, value: 170000 },
    { day: 29, value: 160000 },
    { day: 30, value: 150000 },
    { day: 31, value: 140000 }
  ];

  // Products data
  const products = [
    { name: 'Kia Kia plan', clicks: 5240, conversions: 128, commission: '₦22,000', conversionRate: '2.44%' },
    { name: 'Bronze', clicks: 5240, conversions: 128, commission: '₦22,000', conversionRate: '2.44%' },
    { name: 'Silver', clicks: 5240, conversions: 128, commission: '₦22,000', conversionRate: '2.44%' },
    { name: 'Plantinum', clicks: 5240, conversions: 128, commission: '₦22,000', conversionRate: '2.44%' }
  ];

  return (
    <DashboardContainer> 
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold text-lg">{affiliate.name}</span>
            </button>
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowActions(!showActions)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Actions
              <ChevronDown className="w-4 h-4" />
            </button>
            {showActions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <button className="w-full px-4 py-2 text-left text-sm text-amber-600 hover:bg-gray-50 flex items-center gap-2">
                  <span>⚠️</span> Suspend
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2">
                  <span>🗑️</span> Delete profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          Affiliates / <span className="text-gray-900">Affiliate details</span>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{affiliate.name}</h2>
          <div className="flex items-center gap-6 mb-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>✉️</span>
              <span>{affiliate.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>📅</span>
              <span>Joined {affiliate.joinDate}</span>
            </div>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-green-50 text-green-700">
            {affiliate.status}
          </span>
        </div>

        {/* Time Range Selector */}
        <div className="flex justify-end mb-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <Calendar className="w-4 h-4" />
            {timeRange}
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`rounded-lg p-4 ${
                stat.isHighlighted 
                  ? 'bg-indigo-600 text-white border-2 border-indigo-700' 
                  : 'bg-white border border-gray-200'
              }`}
            >
              <div className={`text-sm mb-2 ${stat.isHighlighted ? 'text-indigo-100' : 'text-gray-500'}`}>
                {stat.label}
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <div className={`text-2xl font-semibold ${stat.isHighlighted ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${stat.isHighlighted ? 'text-indigo-100' : 'text-gray-500'}`}>
                  {stat.change}
                </div>
              </div>
              {stat.subText && (
                <div className={`text-xs ${stat.isHighlighted ? 'text-indigo-100' : 'text-green-600'}`}>
                  {stat.subText}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="mb-6">
            <div className="text-xs text-gray-500 mb-1">JULY</div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="day" 
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickFormatter={(value) => `₦${value / 1000}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value) => [`₦${value.toLocaleString()}`, 'Sales']}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#000000" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Products Performance Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Products performance</h3>
              <p className="text-sm text-gray-500">Products this affiliate promote</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              <Calendar className="w-4 h-4" />
              {timeRange}
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Product</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Clicks</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Conversions</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Commissions</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Conversion rate</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{product.clicks.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{product.conversions}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{product.commission}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{product.conversionRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </DashboardContainer>
  );
}