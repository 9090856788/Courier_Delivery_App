import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Track Parcel", path: "/track" },
  { label: "Calculate Cost", path: "/calculate" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-2xl shadow-xl shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-6">
        {/* ================= Logo ================= */}

        <Link to="/" className="flex items-center gap-3">
          <img
            src="/favicon.png"
            alt="CargoPilot Logo"
            className="h-11 w-11 object-contain"
          />

          <div className="leading-none">
            <h2 className="text-xl font-bold text-foreground">
              Cargo<span className="text-accent">Pilot</span>
            </h2>

            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Delivering with Precision
            </p>
          </div>
        </Link>

        {/* ================= Desktop ================= */}

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <Link to="/login">
            <Button variant="outline" size="sm" className="ml-2">
              Login
            </Button>
          </Link>

          <Link to="/track">
            <Button
              size="sm"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Track Shipment
            </Button>
          </Link>
        </div>

        {/* ================= Mobile ================= */}

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-80">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

            <div className="mt-6 flex items-center gap-3 border-b pb-6">
              <img
                src="/favicon.png"
                alt="CargoPilot Logo"
                className="h-11 w-11 object-contain"
              />

              <div>
                <h2 className="text-lg font-bold">
                  Cargo<span className="text-accent">Pilot</span>
                </h2>

                <p className="text-xs text-muted-foreground">
                  Delivering with Precision
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <Link to="/login" onClick={() => setOpen(false)}>
                <Button variant="outline" className="mt-4 w-full">
                  Login
                </Button>
              </Link>

              <Link to="/track" onClick={() => setOpen(false)}>
                <Button className="mt-2 w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Track Shipment
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
};

export default Navbar;
