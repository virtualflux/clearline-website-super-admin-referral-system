"use client";

import { useEffect, useState } from "react";
import { Home, Users, DollarSign, TrendingUp, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { href: "/dashboard/overview", label: "Overview", icon: Home },
  { href: "/dashboard/products", label: "Products", icon: TrendingUp },
  { href: "/dashboard/affiliate", label: "Affiliate", icon: Users },
  { href: "/dashboard/payout", label: "Payout", icon: DollarSign },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [authData, setAuthData] = useState(null);
  const [initials, setInitials] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("authData");
    if (data) {
      const parsed = JSON.parse(data);
      setAuthData(parsed);

      if (parsed.user?.name) {
        const nameInitials = parsed.user.name
          .split(" ")
          .map((word) => word[0].toUpperCase())
          .join("");
        setInitials(nameInitials);
      }
    }
  }, []);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg"></div>
          <span className="text-xl font-bold text-gray-900">Clearline</span>
        </div>
      </div>

      {/* User */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
            {initials || "?"}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {authData?.user?.name || "Loading..."}
            </p>
            <p className="text-xs text-gray-500">
              {authData?.user?.email || ""}
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                active
                  ? "bg-[#082B82] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
