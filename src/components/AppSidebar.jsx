import {
  LayoutDashboard,
  PackagePlus,
  Boxes,
  Search,
  LogOut,
  BarChart3,
  UserPlus,
  Globe,
  Truck,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Create Parcel", url: "/dashboard/create-parcel", icon: PackagePlus },
  { title: "Manage Parcels", url: "/dashboard/manage-parcels", icon: Boxes },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { title: "Parcel Tracking", url: "/dashboard/tracking", icon: Search },
  { title: "Add Admin", url: "/dashboard/add-admin", icon: UserPlus },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <aside className="w-64 border-r bg-card flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="h-16 border-b flex items-center px-6 gap-3">
        <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm">
          <Truck className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-base font-bold tracking-tight text-foreground leading-none">
            Cargo<span className="text-accent">Pilot</span>
          </h2>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
            Admin Console
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Operations
        </p>
        {mainItems.map((item) => {
          const isActive =
            location.pathname === item.url ||
            (item.url === "/dashboard" && location.pathname === "/dashboard/");

          const Icon = item.icon;

          return (
            <Link
              key={item.url}
              to={item.url}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.title}</span>
            </Link>
          );
        })}

        <div className="pt-4">
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Quick Links
          </p>
          <Link
            to="/"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
          >
            <Globe className="h-4 w-4 shrink-0 text-primary" />
            <span>Public Website</span>
          </Link>
        </div>
      </nav>

      {/* User profile & Logout */}
      <div className="p-4 border-t bg-muted/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
            {(user?.name || "Admin").charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.name || "Admin User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email || "admin@cargopilot.com"}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive border-border"
        >
          <LogOut className="h-3.5 w-3.5 mr-2" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}

export default AppSidebar;
