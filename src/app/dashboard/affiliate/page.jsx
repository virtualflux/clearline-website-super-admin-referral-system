'use client'
import React, { useState } from 'react';
import DashboardContainer from "@/components/DashboardContainer";

export default function AffiliatePage() {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const allAffiliates = [
    { id: 1, name: 'Sarah Johnson', email: 'Sarah@example.com', status: 'Active', target: '1/200', tier: 'Tier 1', tierColor: 'bg-indigo-100 text-indigo-700', commission: '₦123,000', conversion: '2.2%', products: 500 },
    { id: 2, name: 'Sarah Johnson', email: 'Sarah@example.com', status: 'Active', target: '1/200', tier: 'Tier 2', tierColor: 'bg-purple-100 text-purple-700', commission: '₦123,000', conversion: '2.2%', products: 500 },
    { id: 3, name: 'John Doe', email: 'John@example.com', status: 'Active', target: '1/200', tier: 'Tier 3', tierColor: 'bg-blue-100 text-blue-700', commission: '₦123,000', conversion: '2.2%', products: 500 },
    { id: 4, name: 'Jane Smith', email: 'Jane@example.com', status: 'Suspended', target: '1/200', tier: 'Tier 4', tierColor: 'bg-amber-100 text-amber-700', commission: '₦123,000', conversion: '2.2%', products: 500 },
    { id: 5, name: 'Mike Brown', email: 'Mike@example.com', status: 'Active', target: '1/200', tier: 'Tier 5', tierColor: 'bg-emerald-100 text-emerald-700', commission: '₦123,000', conversion: '2.2%', products: 500 },
    { id: 6, name: 'Emma Wilson', email: 'Emma@example.com', status: 'Active', target: '1/200', tier: 'Tier 3', tierColor: 'bg-blue-100 text-blue-700', commission: '₦123,000', conversion: '2.2%', products: 500 },
    { id: 7, name: 'David Lee', email: 'David@example.com', status: 'Active', target: '1/200', tier: 'Tier 2', tierColor: 'bg-purple-100 text-purple-700', commission: '₦123,000', conversion: '2.2%', products: 500 },
    { id: 8, name: 'Lisa Anderson', email: 'Lisa@example.com', status: 'Active', target: '50/200', tier: 'Tier 1', tierColor: 'bg-indigo-100 text-indigo-700', commission: '₦150,000', conversion: '3.1%', products: 650 },
    { id: 9, name: 'Tom Harris', email: 'Tom@example.com', status: 'Active', target: '75/200', tier: 'Tier 4', tierColor: 'bg-amber-100 text-amber-700', commission: '₦98,000', conversion: '1.8%', products: 400 },
    { id: 10, name: 'Amy Chen', email: 'Amy@example.com', status: 'Active', target: '120/200', tier: 'Tier 2', tierColor: 'bg-purple-100 text-purple-700', commission: '₦175,000', conversion: '2.9%', products: 720 },
    { id: 11, name: 'Robert Taylor', email: 'Robert@example.com', status: 'Suspended', target: '10/200', tier: 'Tier 5', tierColor: 'bg-emerald-100 text-emerald-700', commission: '₦45,000', conversion: '1.2%', products: 200 },
    { id: 12, name: 'Sophia Martinez', email: 'Sophia@example.com', status: 'Active', target: '95/200', tier: 'Tier 3', tierColor: 'bg-blue-100 text-blue-700', commission: '₦132,000', conversion: '2.5%', products: 580 }
  ];

  // Filter affiliates based on active tab and search query
  const filteredAffiliates = allAffiliates.filter(affiliate => {
    const matchesTab = 
      activeTab === 'all' ? true :
      activeTab === 'active' ? affiliate.status === 'Active' :
      activeTab === 'suspended' ? affiliate.status === 'Suspended' : true;

    const matchesSearch = 
      affiliate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      affiliate.email.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // Pagination
  const itemsPerPage = 7;
  const totalPages = Math.ceil(filteredAffiliates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAffiliates = filteredAffiliates.slice(startIndex, endIndex);

  // Reset to page 1 when changing tabs or searching
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Count affiliates by status
  const activeCount = allAffiliates.filter(a => a.status === 'Active').length;
  const suspendedCount = allAffiliates.filter(a => a.status === 'Suspended').length;

  const stats = [
    {
      label: 'Total affiliates',
      value: '20,000',
      change: '+12%',
      changeType: 'positive',
      icon: '👥'
    },
    {
      label: 'Active affiliates',
      value: '₦120,000.00',
      change: '+12%',
      changeType: 'positive',
      icon: '📊'
    },
    {
      label: 'Inactive affiliates',
      value: '1,245',
      change: '-10%',
      changeType: 'negative',
      icon: '📉'
    },
    {
      label: 'Top affiliate',
      value: 'Sarah Johnson',
      subValue: 'last month: Steve jobs',
      tier: 'Tier 1',
      icon: '🏆'
    }
  ];

  return (
    <DashboardContainer title="Affiliates" subtitle="Manage your affiliate partners and track their performance">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4 flex-1">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">{stat.label}</span>
                  <span className="text-gray-400">{stat.icon}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-semibold text-gray-900">{stat.value}</span>
                    {stat.tier && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                        {stat.tier}
                      </span>
                    )}
                  </div>
                  {stat.change && (
                    <div className={`flex items-center gap-1 text-xs ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                      <span className={`w-2 h-2 rounded-sm ${stat.changeType === 'positive' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                      <span>{stat.change} from last month</span>
                    </div>
                  )}
                  {stat.subValue && (
                    <div className="text-xs text-gray-500">{stat.subValue}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* <button className="ml-4 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <span>📅</span>
            <span>Last 30 days</span>
            <span className="text-xs">▼</span>
          </button> */}
        </div>

        {/* Tabs and Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Tabs */}
          <div className="border-b border-gray-200 px-6 pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => handleTabChange('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  All Affiliate ({allAffiliates.length})
                </button>
                <button
                  onClick={() => handleTabChange('active')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'active'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Active ({activeCount})
                </button>
                <button
                  onClick={() => handleTabChange('suspended')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'suspended'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Suspended ({suspendedCount})
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">#</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Affiliates</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Target</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Tier</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Commissions</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Conversion rate</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Products</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentAffiliates.length > 0 ? (
                  currentAffiliates.map((affiliate) => (
                    <tr key={affiliate.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{affiliate.id}.</td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{affiliate.name}</div>
                          <div className="text-xs text-gray-500">{affiliate.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                          affiliate.status === 'Active'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}>
                          {affiliate.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{affiliate.target}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${affiliate.tierColor}`}>
                          {affiliate.tier}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{affiliate.commission}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{affiliate.conversion}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{affiliate.products}</td>
                      <td className="px-6 py-4">
                        <button className="text-sm text-gray-600 hover:text-gray-900">
                          View details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-6 py-12 text-center text-sm text-gray-500">
                      No affiliates found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>←</span>
              <span>Previous</span>
            </button>
            <div className="flex items-center gap-1">
              {[...Array(Math.min(totalPages, 2))].map((_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => handlePageChange(idx + 1)}
                  className={`w-8 h-8 rounded flex items-center justify-center text-sm ${
                    currentPage === idx + 1
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              {totalPages > 5 && <span className="px-2 text-gray-400">...</span>}
              {totalPages > 2 && [...Array(Math.min(3, totalPages - 2))].map((_, idx) => {
                const pageNum = totalPages - 2 + idx;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}