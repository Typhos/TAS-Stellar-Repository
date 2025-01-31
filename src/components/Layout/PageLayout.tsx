import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import React from "react";

const PageLayout: React.FC = () => {
  return (
    <div className="page-layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
