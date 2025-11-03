 
import DashboardContainer from "@/components/DashboardContainer";

export default function DashboardLayout({ children }) {
  // Default title/subtitle  
  return (
    <DashboardContainer title="Overview" subtitle="Dashboard overview">
      {children}
    </DashboardContainer>
  );
}