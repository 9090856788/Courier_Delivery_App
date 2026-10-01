import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, CheckCircle2, ShieldCheck, Mail, Lock, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addUserThunk } from "@/features/auth/authSlice";
import { toast } from "sonner";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function AddAdmin() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!form.name.trim() || form.name.trim().length < 3) {
      toast.error("Name must be at least 3 characters");
      return;
    }
    if (!isValidEmail(form.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!form.password || form.password.length < 5) {
      toast.error("Password must be at least 5 characters long");
      return;
    }

    try {
      setSubmitting(true);
      const res = await dispatch(
        addUserThunk({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        })
      ).unwrap();

      setSuccessMessage(
        `Administrator account for ${form.name.trim()} (${form.email.trim()}) registered successfully!`
      );
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      // Handled in thunk toast
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Register Administrator
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Grant staff operations access to the CargoPilot dispatch system.
        </p>
      </div>

      <Card className="border shadow-sm">
        <CardHeader className="pb-4 border-b">
          <CardTitle className="text-base flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            New Administrator Account
          </CardTitle>
          <CardDescription className="text-xs">
            Admin users can manage consignments, update checkpoints, and view financial analytics.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-xs">Full Name *</Label>
              <div className="relative mt-1">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="e.g. Suresh Kumar"
                  className="pl-10 h-11"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-xs">Email Address *</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="e.g. staff@cargopilot.com"
                  className="pl-10 h-11"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-xs">Temporary Password *</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, password: e.target.value }))
                  }
                  placeholder="Minimum 5 characters"
                  className="pl-10 h-11"
                  required
                />
              </div>
            </div>

            {successMessage && (
              <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-11 bg-primary font-semibold mt-2"
            >
              {submitting ? "Registering..." : "Create Admin Account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
