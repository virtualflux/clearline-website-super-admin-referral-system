import { format } from "date-fns";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value || 0);
};

export const tierColors = {
  "Tier 1": "bg-indigo-100 text-indigo-700",
  "Tier 2": "bg-purple-100 text-purple-700",
  "Tier 3": "bg-pink-100 text-pink-700",
  "Tier 4": "bg-amber-100 text-amber-700",
  "Tier 5": "bg-emerald-100 text-emerald-700",
};

export const getChangeColor = (value) => {
  if (!value) return "text-gray-500";
  return value.toString().startsWith("-") ? "text-red-600" : "text-green-600";
};

export const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  return format(date, "dd/MM/yyyy");
};

export const renderArrow = (value) => {
  const Arrow = value.toString().startsWith("-") ? ArrowDownLeft : ArrowUpRight;
  return <Arrow className={`w-4 h-4 mr-1 ${getChangeColor(value)}`} />;
};
