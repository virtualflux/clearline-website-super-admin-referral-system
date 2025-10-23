// app/dashboard/layout.jsx
import DashboardContainer from "@/components/DashboardContainer";

export default function DashboardLayout({ children }) {
  // Default title/subtitle – pages will override them
  return (
    <DashboardContainer title="Overview" subtitle="Dashboard overview">
      {children}
    </DashboardContainer>
  );
}