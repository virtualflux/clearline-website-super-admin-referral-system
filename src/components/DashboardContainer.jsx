// components/dashboard/DashboardContainer.jsx
"use client";

import Sidebar from "./Sidebar";
import { ChevronDown } from "lucide-react";

export default function DashboardContainer({ children, title, subtitle }) {
  return (
    <div className="flex h-screen bg-gray-50">
    
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        
        <div className="bg-white border-b border-gray-200 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
            
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}