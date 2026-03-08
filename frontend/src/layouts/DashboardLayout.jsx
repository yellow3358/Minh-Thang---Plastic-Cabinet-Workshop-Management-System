import { useState, useEffect } from "react";
import "./DashboardLayout.css";
import { Sidebar }        from "../components/Sidebar";
import { Header }         from "../components/Header";
import { LoginModal }     from "../components/LoginModal";
import { ManageBOM }      from "../pages/ManageBOM";
import { PlanProduction } from "../pages/PlanProduction";
import { ExecuteWorkOrder } from "../pages/ExecuteWorkOrder";
import { ControlMaterial }  from "../pages/ControlMaterial";
import { MaterialDetail }   from "../pages/MaterialDetail";
import { MonitorProduction } from "../pages/MonitorProduction";
import { useAuth } from "../context/AuthContext";

const PAGE_TITLES = {
  bom:            "Manage BOM",
  plan:           "Plan Production",
  workorder:      "Execute Work Order",
  material:       "Material",
  materialDetail: "Material Detail",
  monitor:        "Monitor Production",
};

export const DashboardLayout = () => {
  const { user } = useAuth();
  const [activePage,       setActivePage]       = useState("bom");
  const [showLogin,        setShowLogin]        = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [refreshKey,       setRefreshKey]       = useState(0);

  // Tự động hiện LoginModal khi chưa đăng nhập
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!user) setShowLogin(true);
    else       setShowLogin(false);
  }, [user]);

  // Khi click vào 1 vật liệu → chuyển sang trang detail
  const handleSelectMaterial = (material) => {
    setSelectedMaterial(material);
    setActivePage("materialDetail");
  };

  // Quay lại danh sách → tăng refreshKey để fetch lại data mới nhất
  const handleBackToList = () => {
    setSelectedMaterial(null);
    setActivePage("material");
    setRefreshKey((k) => k + 1);
  };

  // Sau khi xóa → quay về list
  const handleDeleted = () => {
    setSelectedMaterial(null);
    setActivePage("material");
    setRefreshKey((k) => k + 1);
  };

  // Khi bấm sidebar → reset material detail
  const handleNavigate = (page) => {
    setSelectedMaterial(null);
    setActivePage(page);
    if (page === "material") setRefreshKey((k) => k + 1);
  };

  const renderPage = () => {
    if (activePage === "materialDetail" && selectedMaterial) {
      return (
          <MaterialDetail
              material={selectedMaterial}
              onBack={handleBackToList}
              onDeleted={handleDeleted}
          />
      );
    }
    switch (activePage) {
      case "bom":      return <ManageBOM />;
      case "plan":     return <PlanProduction />;
      case "workorder":return <ExecuteWorkOrder />;
      case "material": return <ControlMaterial key={refreshKey} onSelectMaterial={handleSelectMaterial} />;
      case "monitor":  return <MonitorProduction />;
      default:         return <ManageBOM />;
    }
  };

  return (
      <div className="app-layout">
        <Sidebar
            activePage={activePage === "materialDetail" ? "material" : activePage}
            onNavigate={handleNavigate}
        />
        <div className="app-main">
          <Header
              pageTitle={PAGE_TITLES[activePage]}
              onLoginClick={() => setShowLogin(true)}
          />
          <main className="app-content">
            {renderPage()}
          </main>
        </div>
        {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      </div>
  );
};