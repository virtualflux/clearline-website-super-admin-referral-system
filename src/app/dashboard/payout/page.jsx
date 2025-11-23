"use client";
import DashboardContainer from "@/components/DashboardContainer";
import React, { useState, useEffect } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import {
  formatCurrency,
  formatDate,
  getChangeColor,
  renderArrow,
} from "@/utils/helpers";
import apiClient from "@/app/api/client";
import toast from "react-hot-toast";

const page = () => {
  const [overview, setOverview] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get("/admin/payout/overview");
        console.log(22, response);
        const data = response.data;

        setOverview(data.summary);
        setWithdrawals(data.withdrawals.withdrawals);
      } catch (error) {
        const message =
          error?.message ||
          error?.response?.data?.message ||
          "Fetch failed — please try again.";

        toast.error(message);
      }
    };

    fetchProducts();
  }, []);

  // Data exactly as in the screenshot
  const stats = {
    totalRequests: overview?.totalWithdrawalRequest?.count || 0,
    pendingApproval: overview?.pendingApproval?.count || 0,
    approvedRequests: overview?.approvedRequest?.count || 0,
    totalPayout: overview?.totalPayout?.amount || 0,
    changes: {
      totalRequests: `${overview?.totalWithdrawalRequest?.change || 0}`,
      pendingApproval: `${overview?.pendingApproval?.change || 0}`,
      approvedRequests: `${overview?.approvedRequest?.change || 0}`,
      totalPayout: `${overview?.totalPayout?.change || 0}`,
    },
  };

  return (
    <DashboardContainer title="Payout" subtitle=" Affiliate withdrawals">
      <div className="p-8 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div></div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Last 30 days</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Total withdrawal request",
              value: stats.totalRequests,
              change: stats.changes.totalRequests,
            },
            {
              label: "Pending approval",
              value: stats.pendingApproval,
              change: stats.changes.pendingApproval,
            },
            {
              label: "Approved request",
              value: stats.approvedRequests,
              change: stats.changes.approvedRequests,
            },
            {
              label: "Total payout",
              value: formatCurrency(stats.totalPayout),
              change: stats.changes.totalPayout,
            },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
              </div>
              <p className="text-3xl font-semibold text-gray-900 mb-1">
                {stat.value}
              </p>
              <div className="flex items-center text-sm">
                {renderArrow(stat.change)}
                <span className={`${getChangeColor(stat.change)}`}>
                  {stat.change}% from last month
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex justify-between items-center p-4 border-b">
            <button className="px-3 py-1 text-sm font-medium text-blue-900 bg-blue-50 rounded-lg">
              All Withdrawal ({withdrawals?.length || 0})
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Affiliates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requested date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {withdrawals.map((withdrawal) => (
                  <tr key={withdrawal.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {withdrawal.id}.
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {withdrawal.affiliateName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {withdrawal.affiliateEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          withdrawal.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : withdrawal.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : withdrawal.status === "failed"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {withdrawal.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(withdrawal.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {withdrawal.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(withdrawal.requestedDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-2">
              <button className="w-8 h-8 rounded-lg bg-blue-900 text-white text-sm font-medium flex items-center justify-center">
                1
              </button>
              {[2, 3].map((page) => (
                <button
                  key={page}
                  className="w-8 h-8 rounded-lg text-gray-600 text-sm hover:bg-gray-100"
                >
                  {page}
                </button>
              ))}
              <span className="text-sm text-gray-600">...</span>
              {[8, 9, 10].map((page) => (
                <button
                  key={page}
                  className="w-8 h-8 rounded-lg text-gray-600 text-sm hover:bg-gray-100"
                >
                  {page}
                </button>
              ))}
            </div>

            <button className="flex items-center space-x-2 text-sm font-medium text-blue-900 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100">
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default page;
