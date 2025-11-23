"use client";

import DashboardContainer from "@/components/DashboardContainer";
import React, { useState, useMemo, useEffect } from "react";
import { Calendar, Search, ChevronLeft, ChevronRight, ChevronDown, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import Link from "next/link";
import { formatCurrency, tierColors } from "@/utils/helpers";
import apiClient from "@/app/api/client";
import toast from "react-hot-toast";

const OverviewPage = () => {
  const [summary, setSummary] = useState({});
  const [affiliates, setAffiliates] = useState([]);

  // Fetch data
  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await apiClient.get("/admin/affiliates/overview");
        console.log(response)
        const data = response.data;

        const affiliatesWithColors = data.affiliates.affiliates.map((a) => ({
          ...a,
          tierColor: tierColors[a.tier] || "bg-gray-100 text-gray-700",
        }));

        setSummary(data.summary);
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

  // Table filters and pagination
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const filtered = useMemo(() => {
    let list = affiliates;

    if (activeFilter !== "All") {
      list = list.filter((a) => a.status === activeFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (a) =>
          (a.name || "").toLowerCase().includes(term) ||
          (a.email || "").toLowerCase().includes(term)
      );
    }

    return list;
  }, [activeFilter, searchTerm, affiliates]);

  const totalRows = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, currentPage]);

  const statusColors = {
    Active: "bg-green-100 text-green-700",
    Suspended: "bg-yellow-100 text-yellow-700",
  };

  // Helper for dynamic change coloring
  const getChangeColor = (value) =>
    value >= 0 ? "text-green-600" : "text-red-600";

  return (
    <DashboardContainer>
      <div className="p-8 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Affiliates</h1>
            <p className="text-sm text-gray-600">
              Manage your affiliate partners and track their performance
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Last 30 days</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {/* Total Affiliates */}
          {[
            { label: "Total affiliates", value: summary.totalAffiliates?.value, change: summary.totalAffiliates?.change },
            { label: "Active affiliates", value: summary.activeAffiliates?.value, change: summary.activeAffiliates?.change },
            { label: "Inactive affiliates", value: summary.inactiveAffiliates?.value, change: summary.inactiveAffiliates?.change },
            { label: "Top affiliate", value: summary.topAffiliate?.name, subtext: summary.topAffiliate?.tier },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
              </div>
              <p className="text-3xl font-semibold text-gray-900 mb-1">
                {stat.value || "-"}
              </p>
              {stat.change !== undefined && (
                <div className={`flex items-center text-sm ${getChangeColor(stat.change)}`}>
                  {stat.change >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownLeft className="w-4 h-4 mr-1" />}
                  <span>{stat.change}% from last month</span>
                </div>
              )}
              {stat.subtext && <p className="text-xs text-gray-500">{stat.subtext}</p>}
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Filter Tabs + Search */}
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center space-x-2">
              {["All", "Active", "Suspended"].map((tab) => {
                const isActive = activeFilter === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveFilter(tab);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "text-blue-900 bg-blue-50"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {tab} ({affiliates.filter((a) => tab === "All" || a.status === tab).length})
                  </button>
                );
              })}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
          </div>

          {/* Table Body */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affiliates</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commissions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginated.map((aff, idx) => (
                  <tr key={aff.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{idx + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{aff.name || "-"}</p>
                        <p className="text-xs text-gray-500">{aff.email || "-"}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[aff.status] || "bg-gray-100 text-gray-700"}`}>
                        {aff.status || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{aff.target || "-"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${tierColors[aff.tier] || "bg-gray-100 text-gray-700"}`}>
                        {aff.tier || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(aff.commissions)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{aff.conversionRate || 0}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{aff.products || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/dashboard/affiliate/${aff.id}`} className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">View details</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" /> <span>Previous</span>
            </button>

            <div className="flex items-center space-x-2">
              {[...Array(totalPages)].map((_, p) => (
                <button key={p} onClick={() => setCurrentPage(p + 1)} className={`w-8 h-8 rounded-lg text-sm font-medium flex items-center justify-center transition-colors ${currentPage === p + 1 ? "bg-blue-900 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
                  {p + 1}
                </button>
              ))}
            </div>

            <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="flex items-center space-x-2 text-sm font-medium text-blue-900 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed">
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default OverviewPage;
