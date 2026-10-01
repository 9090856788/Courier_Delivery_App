import { BrowserRouter, Route, Routes, Navigate, useParams } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Public pages
import Home from "./pages/Home";
import TrackParcel from "./pages/TrackParcel";
import CalculateCost from "./pages/CalculateCost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/Login";

// Protected Admin pages & Layout
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import CreateParcel from "./pages/CreateParcel";
import ManageParcels from "./pages/ManageParcels";
import ParcelDetails from "./pages/ParcelDetails";
import ParcelTracking from "./pages/ParcelTracking";
import Analytics from "./pages/Analytics";
import AddAdmin from "./pages/AddAdmin";

function ParcelRedirect() {
  const { id } = useParams();
  return <Navigate to={`/dashboard/parcel/${id}`} replace />;
}

const PublicLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <div className="flex-1">{children}</div>
    <Footer />
  </div>
);

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner position="top-right" />
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        {/* Public Website Routes */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/track"
          element={
            <PublicLayout>
              <TrackParcel />
            </PublicLayout>
          }
        />
        <Route
          path="/calculate"
          element={
            <PublicLayout>
              <CalculateCost />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />

        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Admin Console Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/create-parcel" element={<CreateParcel />} />
            <Route path="/dashboard/manage-parcels" element={<ManageParcels />} />
            <Route path="/dashboard/parcel/:id" element={<ParcelDetails />} />
            <Route path="/dashboard/tracking" element={<ParcelTracking />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/add-admin" element={<AddAdmin />} />
          </Route>
        </Route>

        {/* Legacy / Direct Aliases */}
        <Route path="/create-parcel" element={<Navigate to="/dashboard/create-parcel" replace />} />
        <Route path="/manage-parcels" element={<Navigate to="/dashboard/manage-parcels" replace />} />
        <Route path="/tracking" element={<Navigate to="/dashboard/tracking" replace />} />
        <Route path="/analytics" element={<Navigate to="/dashboard/analytics" replace />} />
        <Route path="/add-admin" element={<Navigate to="/dashboard/add-admin" replace />} />
        <Route path="/parcel/:id" element={<ParcelRedirect />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <PublicLayout>
              <NotFound />
            </PublicLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
