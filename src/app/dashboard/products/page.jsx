'use client'
import React, { useState } from 'react';
import DashboardContainer from '@/components/DashboardContainer';
import { Search, ChevronDown, Copy, X, Upload } from 'lucide-react';

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showActions, setShowActions] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalStep, setModalStep] = useState(1); // 1 for product details, 2 for commission
  
  // Form states
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [landingPage, setLandingPage] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [activeStatus, setActiveStatus] = useState(true);
  const [sellingPrice, setSellingPrice] = useState('');
  const [commissionType, setCommissionType] = useState('Percentage');
  const [tiers, setTiers] = useState([]);

  // Mock products data
  const allProducts = [
    {
      id: 1,
      name: 'Kia kia plan',
      description: 'This plan is',
      image: '/placeholder-product.png',
      webPage: 'https://clearline.com/kia-plan',
      price: '₦1,200',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Bronze Plan',
      description: 'Basic tier plan',
      image: '/placeholder-product.png',
      webPage: 'https://clearline.com/bronze',
      price: '₦2,500',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Silver Plan',
      description: 'Mid tier plan',
      image: '/placeholder-product.png',
      webPage: 'https://clearline.com/silver',
      price: '₦5,000',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Gold Plan',
      description: 'Premium plan',
      image: '/placeholder-product.png',
      webPage: 'https://clearline.com/gold',
      price: '₦10,000',
      status: 'Disabled'
    }
  ];

  // Filter products
  const filteredProducts = allProducts.filter(product => {
    const matchesTab = 
      activeTab === 'all' ? true :
      activeTab === 'active' ? product.status === 'Active' :
      activeTab === 'disabled' ? product.status === 'Disabled' : true;

    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // Count products
  const allCount = allProducts.length;
  const activeCount = allProducts.filter(p => p.status === 'Active').length;
  const disabledCount = allProducts.filter(p => p.status === 'Disabled').length;

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
    }
  };

  const handleContinue = () => {
    if (modalStep === 1) {
      setModalStep(2);
    } else {
      // Handle form submission
      console.log('Submit form');
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setModalStep(1);
    setProductName('');
    setDescription('');
    setLandingPage('');
    setProductImage(null);
    setActiveStatus(true);
    setSellingPrice('');
    setCommissionType('Percentage');
    setTiers([]);
  };

  const addNewTier = () => {
    setTiers([...tiers, { name: '', value: '' }]);
  };

  return (
    <DashboardContainer 
      title="Products" 
      subtitle="Manage your affiliate products and track their performance"
    >
      <div className="space-y-6">
        {/* Tabs and Search Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 pt-6 pb-4">
            <div className="flex items-center justify-between">
              {/* Tabs */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'all'
                      ? 'bg-[#082B82] text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  All Products ({allCount})
                </button>
                <button
                  onClick={() => setActiveTab('active')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'active'
                      ? 'bg-[#082B82] text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Active ({activeCount})
                </button>
                <button
                  onClick={() => setActiveTab('disabled')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'disabled'
                      ? 'bg-[#082B82] text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Disabled ({disabledCount})
                </button>
              </div>

              {/* Search and Add Product */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#082B82]focus:border-transparent w-64"
                  />
                </div>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 bg-white border border-[#082B82] text-[#082B82] rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
                >
                  Add product
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-y border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Web page
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Selling price
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <div className="w-8 h-8 bg-gray-200 rounded"></div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-xs text-gray-500">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleCopyLink(product.webPage)}
                          className="flex items-center gap-2 text-sm text-[#082B82] hover:text-blue-800"
                        >
                          <span>Copy link</span>
                          <Copy className="w-4 h-4" />
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900 font-medium">{product.price}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          product.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative">
                          <button
                            onClick={() => setShowActions(showActions === product.id ? null : product.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#082B82] text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
                          >
                            Actions
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          {showActions === product.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                <span>✏️</span> Edit details
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2">
                                <span>🗑️</span> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-sm text-gray-500">
                      No products found matching your criteria
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
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>←</span>
              <span>Previous</span>
            </button>
            
            <div className="flex items-center gap-1">
              {[...Array(Math.min(totalPages, 10))].map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm transition-colors ${
                      currentPage === pageNum
                        ? 'bg-[#082B82] text-white'
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
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto shadow-xl border border-gray-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {modalStep === 1 ? 'Add product' : 'Set commission'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {modalStep === 1 
                    ? 'Create a new product for affiliates to promote' 
                    : 'Create a new product for affiliates to promote'}
                </p>
              </div>
              <button 
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {modalStep === 1 ? (
                <div className="space-y-4">
                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Product name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter product name"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#082B82]focus:border-transparent"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Description
                    </label>
                    <textarea
                      placeholder="Describe the product"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#082B82]focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Product Landing Page */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Product landing page
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={landingPage}
                      onChange={(e) => setLandingPage(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#082B82]focus:border-transparent"
                    />
                  </div>

                  {/* Add Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Add image
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        Drag and drop images here or{' '}
                        <label className="text-[#082B82] cursor-pointer hover:text-[#082B82]">
                          click to upload
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </p>
                    </div>
                  </div>

                  {/* Active Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Active status
                    </label>
                    <p className="text-sm text-gray-500 mb-3">
                      Show this product to affiliates
                    </p>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={activeStatus}
                        onChange={(e) => setActiveStatus(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#082B82]"></div>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Product Name Display */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase">
                      {productName || 'KIA KIA PLAN'}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">Description</p>
                  </div>

                  {/* Selling Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Selling Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
                      <input
                        type="text"
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#082B82]focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Commission Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Commission type
                    </label>
                    <select
                      value={commissionType}
                      onChange={(e) => setCommissionType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#082B82]focus:border-transparent"
                    >
                      <option>Percentage</option>
                      <option>Fixed Amount</option>
                    </select>
                  </div>

                  {/* Tier System */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Tier settings
                    </label>
                    
                    {tiers.length > 0 && (
                      <div className="mb-3">
                        <div className="grid grid-cols-[1fr,120px,100px,40px] gap-3 mb-2">
                          <div className="text-xs text-gray-500 font-medium">Tier</div>
                          <div className="text-xs text-gray-500 font-medium">Commission</div>
                          <div className="text-xs text-gray-500 font-medium">Percentage</div>
                          <div></div>
                        </div>
                        
                        <div className="space-y-2">
                          {tiers.map((tier, index) => {
                            const tierColors = [
                              'bg-indigo-100 text-indigo-700',
                              'bg-purple-100 text-purple-700',
                              'bg-blue-100 text-[#082B82]',
                              'bg-amber-100 text-amber-700',
                              'bg-emerald-100 text-emerald-700'
                            ];
                            return (
                              <div key={index} className="grid grid-cols-[1fr,120px,100px,40px] gap-3 items-center">
                                <div className={`px-3 py-2 rounded-md text-sm font-medium ${tierColors[index % 5]}`}>
                                  Tier {index + 1}
                                </div>
                                <input
                                  type="text"
                                  placeholder="₦300"
                                  value={tier.commission}
                                  onChange={(e) => {
                                    const newTiers = [...tiers];
                                    newTiers[index].commission = e.target.value;
                                    setTiers(newTiers);
                                  }}
                                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#082B82] focus:border-transparent"
                                />
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    placeholder="10"
                                    value={tier.percentage}
                                    onChange={(e) => {
                                      const newTiers = [...tiers];
                                      newTiers[index].percentage = e.target.value;
                                      setTiers(newTiers);
                                    }}
                                    className="w-16 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#082B82] focus:border-transparent"
                                  />
                                  <span className="text-gray-500">%</span>
                                </div>
                                <button
                                  onClick={() => {
                                    const newTiers = tiers.filter((_, i) => i !== index);
                                    setTiers(newTiers);
                                  }}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <span>🗑️</span>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    
                    <button
                      onClick={addNewTier}
                      className="w-full px-4 py-2.5 border border-gray-300 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      Add new tier
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              {modalStep === 2 && (
                <button
                  onClick={() => setModalStep(1)}
                  className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                className="px-6 py-2 bg-[#082B82] text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
              >
                {modalStep === 1 ? 'Continue' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardContainer>
  );
};

export default ProductsPage;