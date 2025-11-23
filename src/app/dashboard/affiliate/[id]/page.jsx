"use client";

import DashboardContainer from "@/components/DashboardContainer";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import apiClient from "@/app/api/client";
import toast from "react-hot-toast";
import { formatCurrency, getChangeColor } from "@/utils/helpers";

export default function AffiliateDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [affiliate, setAffiliate] = useState(null);
  const [stats, setStats] = useState(null);
  const [topProducts, setTopProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAffiliate = async () => {
      try {
        const response = await apiClient.get(`/admin/affiliates/${id}`);
        console.log(response);
        setAffiliate(response.data.affiliate);
        setStats(response.data.stats);
        setTopProducts(response.data.topProducts);
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

  console.log(stats);

  const renderChange = (value) => {
    if (value === undefined || value === null) return null;
    const Arrow = value.toString().startsWith("-")
      ? ArrowDownLeft
      : ArrowUpRight;
    return (
      <span
        className="flex items-center ml-1 text-sm"
        style={{ color: getChangeColor(value) }}
      >
        <Arrow className={`w-4 h-4 mr-1 ${getChangeColor(value)}`} />
        {value}%
      </span>
    );
  };

  const toggleAffiliateStatus = async () => {
    try {
      const response = await apiClient.post(`/admin/affiliates/suspend/${id}`);
      if (response.success) {
        toast.success(response.message);
      }
    } catch (error) {
      const message =
        error?.message ||
        error?.response?.data?.message ||
        "Fetch failed — please try again.";

      toast.error(message);
    }
  };

  const deleteAffiliate = async () => {
    try {
      const response = await apiClient.post(`/admin/affiliates/delete/${id}`);
      if (response.success) {
        toast.success(response.message);
      }
    } catch (error) {
      const message =
        error?.message ||
        error?.response?.data?.message ||
        "Fetch failed — please try again.";

      toast.error(message);
    }
  };

  const calculateConversionRate = (conversions, clicks) => {
    if (!clicks || clicks === 0) return 0;
    return ((conversions / clicks) * 100).toFixed(2);
  };

  return (
    <DashboardContainer>
      <div className="p-8 bg-gray-50 min-h-screen">
        {/* Breadcrumb + Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-1 hover:text-gray-900 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 inline-block" />
              <span>{affiliate.name}</span>
            </button>
            <span>/</span>
            <span>Affiliate details</span>
          </div>

          <div className="flex items-center space-x-3">
            <select className="px-4 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Actions</option>
            </select>
            <button
              onClick={toggleAffiliateStatus}
              className="inline-block px-4 py-2 text-sm text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-200 transition-colors cursor-pointer"
            >
              {affiliate.isActive ? "Suspend" : "Unsuspend"}
            </button>

            <button
              onClick={deleteAffiliate}
              className="inline-block px-4 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-200 transition-colors cursor-pointer"
            >
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
                <span>•</span>
                <span>Referral code: {affiliate.referralCode}</span>
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

          <div className="grid grid-cols-4 gap-6 mb-8">
            {[
              {
                label: "Total Sales",
                value: stats.totalSales,
                change: 0,
              },
              {
                label: "Total Commission",
                value: formatCurrency(
                  stats.totalCommissions.averageCommision.value
                ),
                change: stats.totalCommissions.averageCommision.change,
              },
              // {
              //   label: "Total Orders",
              //   value: stats.totalCommissions.totalOrders.value,
              //   change: stats.totalCommissions.totalOrders.change,
              // },
              {
                label: "Conversion Rate",
                value: stats.totalCommissions.conversionRate.value + "%",
                change: stats.totalCommissions.conversionRate.change,
              },
              {
                label: "Total Referrals",
                value: stats.totalReferrals,
                change: 0,
              },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900 flex justify-center items-center">
                  {stat.value}
                  {renderChange(stat.change)}
                </p>
                {stat.lastMonth !== undefined && (
                  <p className="text-xs text-gray-500">
                    {stat.lastMonth} from last month
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Chart placeholder */}
          <div className="relative h-64 bg-gray-50 rounded-lg overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 800 250">
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
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clicks
                  </th> */}
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
                {topProducts?.map((p, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {p.productName}
                    </td>
                    {/* <td className="px-6 py-4 text-sm text-gray-900">
                      {p.clicks.toLocaleString()}
                    </td> */}
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {p.sales}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {formatCurrency(p.revenue)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {stats.totalCommissions.conversionRate.value}
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
