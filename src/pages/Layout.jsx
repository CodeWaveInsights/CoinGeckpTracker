import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import ErrorBoundary from "../components/ErrorBoundary";

function MainLayout() {
  return (
    <>
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>
      <Outlet />
    </>
  );
}

export default MainLayout;
