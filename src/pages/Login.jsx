import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { loginThunk } from "@/features/auth/authSlice";
import { Truck, Lock, Mail, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("admin@cargopilot.com");
  const [password, setPassword] = useState("admin123");

  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    const res = await dispatch(loginThunk({ email: email.trim(), password }));
    if (res.meta.requestStatus === "fulfilled") {
      navigate(from, { replace: true });
    }
  };

  const handleDemoLogin = async () => {
    setEmail("admin@cargopilot.com");
    setPassword("admin123");
    const res = await dispatch(
      loginThunk({ email: "admin@cargopilot.com", password: "admin123" })
    );
    if (res.meta.requestStatus === "fulfilled") {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-background to-orange-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-md">
              <Truck className="h-6 w-6" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
                Cargo<span className="text-accent">Pilot</span>
              </h1>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
                Operations Portal
              </p>
            </div>
          </Link>
        </div>

        <Card className="shadow-xl border bg-card/95 backdrop-blur">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-bold">Admin Sign In</CardTitle>
            <CardDescription>
              Enter credentials to access the courier management system.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@cargopilot.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full h-11 bg-primary font-semibold"
              >
                {loading ? "Authenticating..." : "Sign In to Dashboard"}
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground font-medium">
                  Instant Preview
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full h-11 border-primary/30 text-primary hover:bg-primary/5 font-semibold"
            >
              <Zap className="h-4 w-4 mr-2 text-accent" />
              1-Click Demo Admin Login
            </Button>

            <div className="pt-3 text-center">
              <Link
                to="/"
                className="text-xs text-muted-foreground hover:text-primary transition"
              >
                ← Return to CargoPilot Public Website
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
