import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Globe,
  LogOut,
  User,
  Package,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-background w-full">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <AppSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card/90 backdrop-blur px-4 md:px-6 shadow-sm">
          <div className="flex items-center gap-3">
            {/* Mobile Sheet Trigger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72">
                <div onClick={() => setMobileOpen(false)}>
                  <AppSidebar />
                </div>
              </SheetContent>
            </Sheet>

            <div>
              <h2 className="text-sm font-semibold text-foreground">
                CargoPilot Logistics Operations
              </h2>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Courier & Parcel Management Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex gap-1.5">
              <Link to="/">
                <Globe className="h-3.5 w-3.5" />
                <span>Public Site</span>
              </Link>
            </Button>

            <Button asChild size="sm" className="gap-1.5 bg-primary">
              <Link to="/dashboard/create-parcel">
                <Package className="h-3.5 w-3.5" />
                <span>New Parcel</span>
              </Link>
            </Button>

            <div className="flex items-center gap-2 pl-2 border-l">
              <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs">
                {(user?.name || "A").charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium hidden md:inline-block">
                {user?.name || "Admin"}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                title="Sign out"
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
