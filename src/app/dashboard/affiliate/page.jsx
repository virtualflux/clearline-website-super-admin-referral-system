'use client';

import DashboardContainer from '@/components/DashboardContainer';
import React, { useState, useMemo, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react';
import Link from 'next/link';

// Format currency: NGN 123,000
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);
};

const page = () => {
  // Static data (as in screenshot)
  const rawAffiliates = [
    { id: 1, name: 'Sarah Johnson', email: 'Sarah@example.com', status: 'Active', target: '1/200', tier: 'Tier 1', commissions: 123000, conversion: '2.2%', products: 500 },
    { id: 2, name: 'Sarah Johnson', email: 'Sarah@example.com', status: 'Active', target: '1/200', tier: 'Tier 2', commissions: 123000, conversion: '2.2%', products: 500 },
    { id: 3, name: 'Sarah Johnson', email: 'Sarah@example.com', status: 'Active', target: '1/200', tier: 'Tier 3', commissions: 123000, conversion: '2.2%', products: 500 },
    { id: 4, name: 'Sarah Johnson', email: 'Sarah@example.com', status: 'Suspended', target: '1/200', tier: 'Tier 4', commissions: 123000, conversion: '2.2%', products: 500 },
    { id: 5, name: 'Sarah Johnson', email: 'Sarah@example.com', status: 'Active', target: '1/200', tier: 'Tier 5', commissions: 123000, conversion: '2.2%', products: 500 },
    { id: 6, name: 'Sarah Johnson', email: 'Sarah@example.com', status: 'Active', target: '1/200', tier: 'Tier 3', commissions: 123000, conversion: '2.2%', products: 500 },
    { id: 7, name: 'Sarah Johnson', email: 'Sarah@example.com', status: 'Active', target: '1/200', tier: 'Tier 2', commissions: 123000, conversion: '2.2%', products: 500 },
  ];

  // State
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  // FIX: Pre-format numbers to avoid SSR toLocaleString() error
  const totalAffiliatesFormatted = 20000..toLocaleString();
  const activeAffiliatesFormatted = formatCurrency(120000);
  const inactiveAffiliatesFormatted = 1245..toLocaleString();

  // Filter + Search
  const filtered = useMemo(() => {
    let list = rawAffiliates;

    if (activeFilter !== 'All') {
      list = list.filter((a) => a.status === activeFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(term) ||
          a.email.toLowerCase().includes(term)
      );
    }

    return list;
  }, [activeFilter, searchTerm]);

  const totalRows = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));

  // Reset page when filters change
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
    if (currentPage < 1) setCurrentPage(1);
  }, [totalPages, currentPage]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, currentPage]);

  // Counts for tabs
  const counts = {
    All: rawAffiliates.length,
    Active: rawAffiliates.filter((a) => a.status === 'Active').length,
    Suspended: rawAffiliates.filter((a) => a.status === 'Suspended').length,
  };

  // Styling
  const tierColors = {
    'Tier 1': 'bg-purple-100 text-purple-700',
    'Tier 2': 'bg-pink-100 text-pink-700',
    'Tier 3': 'bg-blue-100 text-blue-700',
    'Tier 4': 'bg-yellow-100 text-yellow-700',
    'Tier 5': 'bg-green-100 text-green-700',
  };

  const statusColors = {
    Active: 'bg-green-100 text-green-700',
    Suspended: 'bg-yellow-100 text-yellow-700',
  };

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
          {/* Total affiliates */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm text-gray-600">Total affiliates</p>
              <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
            </div>
            <p className="text-3xl font-semibold text-gray-900 mb-1">
              {totalAffiliatesFormatted}
            </p>
            <div className="flex items-center text-sm">
              <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">+12% from last month</span>
            </div>
          </div>

          {/* Active affiliates */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm text-gray-600">Active affiliates</p>
              <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
            </div>
            <p className="text-3xl font-semibold text-gray-900 mb-1">
              {activeAffiliatesFormatted}
            </p>
            <div className="flex items-center text-sm">
              <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">+12% from last month</span>
            </div>
          </div>

          {/* Inactive affiliates */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm text-gray-600">Inactive affiliates</p>
              <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
            </div>
            <p className="text-3xl font-semibold text-gray-900 mb-1">
              {inactiveAffiliatesFormatted}
            </p>
            <div className="flex items-center text-sm">
              <ArrowDownLeft className="w-4 h-4 text-red-600 mr-1" />
              <span className="text-red-600">-10% from last month</span>
            </div>
          </div>

          {/* Top affiliate */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm text-gray-600">Top affiliate</p>
              <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
            </div>
            <p className="text-lg font-semibold text-gray-900 mb-1">
              Sarah Johnson
            </p>
            <p className="text-xs text-gray-500">Last month: Steve Jobs</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Filter Tabs + Search */}
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center space-x-2">
              {['All', 'Active', 'Suspended'].map((tab) => {
                const count = counts[tab];
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
                        ? 'text-blue-900 bg-blue-50'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab} ({count})
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
                {paginated.map((aff) => (
                  <tr key={aff.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{aff.id}.</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{aff.name}</p>
                        <p className="text-xs text-gray-500">{aff.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[aff.status]}`}>
                        {aff.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{aff.target}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${tierColors[aff.tier]}`}>
                        {aff.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(aff.commissions)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{aff.conversion}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{aff.products}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
  <Link
    href={`/dashboard/affiliate/${aff.id}`}
    className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
  >
    View details
  </Link>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(1)}
                className={`w-8 h-8 rounded-lg text-sm font-medium flex items-center justify-center transition-colors ${
                  currentPage === 1 ? 'bg-blue-900 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                1
              </button>
              {[2, 3].map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm hover:bg-gray-100 transition-colors ${
                    currentPage === p ? 'bg-blue-900 text-white' : 'text-gray-600'
                  }`}
                >
                  {p}
                </button>
              ))}
              <span className="text-sm text-gray-600">...</span>
              {[8, 9, 10].map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm hover:bg-gray-100 transition-colors ${
                    currentPage === p ? 'bg-blue-900 text-white' : 'text-gray-600'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center space-x-2 text-sm font-medium text-blue-900 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
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