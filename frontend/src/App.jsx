import { useState } from "react";
import companyLogo from "../image/logominhthang.jpg";
import "./App.css";

const featureMenus = [
  "Monitor Low Stock",
  "View Inventory Transaction History",
  "Manage Inventory by Batch",
];

function Sidebar({ collapsed, onToggle }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={companyLogo} alt="Logo Minh Thang" className="company-logo" />
        <h1 className="company-name">Minh Thang Plastic Cabinet </h1>
      </div>

      <div className="sidebar-module-title">
        <span>Inventory Monitoring</span>
      </div>

      <button
        className="sidebar-toggle"
        type="button"
        aria-label={collapsed ? "Mở thanh bên" : "Ẩn thanh bên"}
        onClick={onToggle}
      >
        <span className="toggle-icon">☰</span>
      </button>
    </aside>
  );
}

function TopNav() {
  return (
    <header className="top-nav">
      <nav className="feature-nav" aria-label="Điều hướng tính năng tồn kho">
        {featureMenus.map((item, index) => (
          <a key={item} href="#" className={`feature-link ${index === 0 ? "active" : ""}`}>
            {item}
          </a>
        ))}
      </nav>

      <div className="account-actions">
        <a href="#" className="profile-link" aria-label="Trang thông tin cá nhân">
          <span className="profile-icon">👤</span>
        </a>
        <button className="logout-button" type="button">
          Logout
        </button>
      </div>
    </header>
  );
}

function MainContent() {
  return (
    <section className="content-area" aria-label="Khu vực hiển thị dữ liệu">
      <div className="empty-placeholder">
        <p>.</p>
      </div>
    </section>
  );
}

export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className={`app-layout ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar
        collapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed((previous) => !previous)}
      />

      <main className="main-content">
        <TopNav />
        <MainContent />
      </main>
    </div>
  );
}
