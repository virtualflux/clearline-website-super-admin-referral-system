"use client";

import DashboardContainer from "@/components/DashboardContainer";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Calendar, ChevronDown, ChevronLeft } from "lucide-react";
import apiClient from "@/app/api/client";
import toast from "react-hot-toast";
import { formatCurrency } from "@/utils/helpers";

export default function AffiliateDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [affiliate, setAffiliate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAffiliate = async () => {
      try {
        const response = await apiClient.get(`/admin/affiliates/${id}`);
        console.log(55, response);
        setAffiliate(response.data.affiliate);
      } catch (error) {
        const message =
          error?.message ||
          error?.response?.data?.message ||
          "Failed to fetch affiliate";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAffiliate();
  }, [id]);

  if (loading) {
    return (
      <DashboardContainer>
        <div className="p-8 text-center text-gray-500">
          Loading affiliate data...
        </div>
      </DashboardContainer>
    );
  }

  if (!affiliate) {
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
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-1 hover:text-gray-900"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{affiliate.name}</span>
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
              <h2 className="text-xl font-semibold text-gray-900">
                {affiliate.name}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <span>Email: {affiliate.email}</span>
                <span>•</span>
                <span>
                  Joined {new Date(affiliate.joinedDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                affiliate.status === "Active"
                  ? "text-green-700 bg-green-100"
                  : "text-red-700 bg-red-100"
              }`}
            >
              {affiliate.status}
            </span>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              Performance Overview
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Last 30 days</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-6 mb-8">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Sales</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(affiliate.totalSales)}
                <span className="ml-1 text-sm text-green-600">
                  {affiliate.salesChange}
                </span>
              </p>
              <p className="text-xs text-gray-500">
                {affiliate.salesLastMonth} from last month
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">Total Commission</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(affiliate.totalCommission)}
                <span className="ml-1 text-sm text-green-600">
                  {affiliate.commissionChange}
                </span>
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">Total Sales Rate</p>
              <p className="text-2xl font-semibold text-gray-900">
                {affiliate.totalSalesRate}
                <span className="ml-1 text-sm text-green-600">
                  {affiliate.salesRateChange}
                </span>
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">Total Withdrawal</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(affiliate.totalWithdrawal)}
                <span className="ml-1 text-sm text-green-600">
                  {affiliate.withdrawalChange}
                </span>
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">Total Clicks</p>
              <p className="text-2xl font-semibold text-gray-900">
                {affiliate?.totalClicks || 0}
                <span className="ml-1 text-sm text-green-600">
                  {affiliate.clicksChange}
                </span>
              </p>
            </div>
          </div>

          {/* Chart placeholder (replace with dynamic chart data as needed) */}
          <div className="relative h-64 bg-gray-50 rounded-lg overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 800 250">
              {/* Grid lines */}
              {[50, 100, 150, 200].map((y) => (
                <line
                  key={y}
                  x1="50"
                  y1={y}
                  x2="750"
                  y2={y}
                  stroke="#E5E7EB"
                  strokeWidth="1"
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Products Performance */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Products Performance
              </h3>
              <p className="text-sm text-gray-600">
                Products this affiliate promotes
              </p>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversion Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {affiliate.products?.map((p, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {p.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {p.clicks.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {p.conversions}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {formatCurrency(p.commission)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {p.rate}
                    </td>
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
