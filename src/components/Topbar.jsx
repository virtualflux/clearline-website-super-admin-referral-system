// components/dashboard/TopBar.jsx
import { ChevronDown } from "lucide-react";

export default function TopBar({ title, subtitle }) {
  return (
    <header className="px-6 py-15">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>

        {/* <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600">Last 30 days</span>
          <button className="flex items-center space-x-1 px-3   border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <span className="text-sm font-medium">Last 30 days</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div> */}
      </div>
    </header>
  );
}