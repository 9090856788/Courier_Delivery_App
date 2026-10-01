import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Truck,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Zap,
  Globe,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { calculateCostThunk } from "@/features/parcels/parcelSlice";
import {
  getDestinationOptionsForShipmentType,
  NATIONAL_CITY_OPTIONS,
} from "@/lib/locationData";
import { Link } from "react-router-dom";

const categories = [
  { value: "documents", label: "Documents & Papers" },
  { value: "electronics", label: "Electronics & Gadgets" },
  { value: "clothing", label: "Clothing & Apparel" },
  { value: "fragile", label: "Fragile / Glassware" },
  { value: "food", label: "Food & Perishables" },
  { value: "medicine", label: "Medicines & Healthcare" },
  { value: "cosmetics", label: "Cosmetics & Beauty" },
  { value: "books", label: "Books & Educational" },
  { value: "small_package", label: "Small Package (< 3kg)" },
  { value: "large_package", label: "Large Package (Bulk)" },
  { value: "other", label: "Other Merchandise" },
];

const CalculateCostPage = () => {
  const dispatch = useDispatch();
  const { calculatedCost, costLoading: loading } = useSelector(
    (state) => state.parcels
  );

  const [form, setForm] = useState({
    originCity: "Bengaluru",
    destinationCity: "Mumbai",
    shipmentType: "National",
    parcelCategory: "electronics",
    parcelWeight: 2,
    deliveryType: "standard",
  });

  const destinationOptions = getDestinationOptionsForShipmentType(
    form.shipmentType
  );

  const handleCalculate = async (e) => {
    e?.preventDefault();
    if (!form.originCity || !form.destinationCity) {
      toast.error("Please specify both origin and destination cities.");
      return;
    }
    const weightNum = parseFloat(form.parcelWeight);
    if (isNaN(weightNum) || weightNum <= 0) {
      toast.error("Weight must be greater than 0 kg.");
      return;
    }

    dispatch(
      calculateCostThunk({
        originCity: form.originCity.trim(),
        destinationCity: form.destinationCity.trim(),
        shipmentType: form.shipmentType,
        parcelCategory: form.parcelCategory,
        deliveryType: form.deliveryType,
        parcelWeight: weightNum,
      })
    );
  };

  return (
    <main className="min-h-screen pt-24 pb-16 bg-muted/20">
      <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
            Transparent Pricing
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Shipping Cost Calculator
          </h1>
          <p className="mt-3 text-muted-foreground text-base">
            Get instant, competitive courier rate estimates based on weight, route, speed, and category.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Form Card */}
          <div className="lg:col-span-7">
            <Card className="shadow-lg border bg-card">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Shipment Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleCalculate} className="space-y-5">
                  {/* Shipment Type */}
                  <div>
                    <Label className="text-xs font-semibold uppercase text-muted-foreground">
                      Shipment Scope
                    </Label>
                    <div className="grid grid-cols-2 gap-3 mt-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          setForm((p) => ({
                            ...p,
                            shipmentType: "National",
                            destinationCity: "Mumbai",
                          }))
                        }
                        className={`py-3 px-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition ${
                          form.shipmentType === "National"
                            ? "bg-primary text-white border-primary shadow-sm"
                            : "bg-muted/30 hover:bg-muted text-muted-foreground"
                        }`}
                      >
                        <Truck className="h-4 w-4" />
                        Domestic (National)
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setForm((p) => ({
                            ...p,
                            shipmentType: "International",
                            destinationCity: "United Kingdom, London",
                          }))
                        }
                        className={`py-3 px-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition ${
                          form.shipmentType === "International"
                            ? "bg-primary text-white border-primary shadow-sm"
                            : "bg-muted/30 hover:bg-muted text-muted-foreground"
                        }`}
                      >
                        <Globe className="h-4 w-4" />
                        International
                      </button>
                    </div>
                  </div>

                  {/* Route: Origin & Destination */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-semibold uppercase text-muted-foreground">
                        Origin City
                      </Label>
                      <Select
                        value={form.originCity}
                        onValueChange={(val) =>
                          setForm((prev) => ({ ...prev, originCity: val }))
                        }
                      >
                        <SelectTrigger className="mt-1.5 h-11">
                          <SelectValue placeholder="Select Origin City" />
                        </SelectTrigger>
                        <SelectContent>
                          {NATIONAL_CITY_OPTIONS.map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              {c.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-xs font-semibold uppercase text-muted-foreground">
                        Destination City / Country
                      </Label>
                      <Select
                        value={form.destinationCity}
                        onValueChange={(val) =>
                          setForm((prev) => ({ ...prev, destinationCity: val }))
                        }
                      >
                        <SelectTrigger className="mt-1.5 h-11">
                          <SelectValue placeholder="Select Destination" />
                        </SelectTrigger>
                        <SelectContent>
                          {destinationOptions.map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              {c.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Category & Weight */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-semibold uppercase text-muted-foreground">
                        Parcel Category
                      </Label>
                      <Select
                        value={form.parcelCategory}
                        onValueChange={(val) =>
                          setForm((prev) => ({ ...prev, parcelCategory: val }))
                        }
                      >
                        <SelectTrigger className="mt-1.5 h-11">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              {c.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-xs font-semibold uppercase text-muted-foreground">
                        Approximate Weight (kg)
                      </Label>
                      <Input
                        type="number"
                        step="0.1"
                        min="0.1"
                        max="200"
                        value={form.parcelWeight}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            parcelWeight: e.target.value,
                          }))
                        }
                        className="mt-1.5 h-11"
                      />
                    </div>
                  </div>

                  {/* Delivery Speed / Service Type */}
                  <div>
                    <Label className="text-xs font-semibold uppercase text-muted-foreground">
                      Delivery Speed
                    </Label>
                    <div className="grid sm:grid-cols-3 gap-3 mt-1.5">
                      {[
                        { id: "standard", title: "Standard", desc: "2-4 Business Days", fee: "Base rate" },
                        { id: "overnight", title: "Overnight", desc: "Next Day Delivery", fee: "+₹80" },
                        { id: "sameDay", title: "Same Day", desc: "Fastest Express", fee: "+₹150" },
                      ].map((type) => (
                        <div
                          key={type.id}
                          onClick={() =>
                            setForm((prev) => ({ ...prev, deliveryType: type.id }))
                          }
                          className={`p-3 rounded-xl border cursor-pointer transition ${
                            form.deliveryType === type.id
                              ? "border-primary bg-primary/5 ring-1 ring-primary"
                              : "border-border hover:bg-muted/50"
                          }`}
                        >
                          <p className="text-sm font-semibold text-foreground flex items-center justify-between">
                            {type.title}
                            <span className="text-[10px] font-mono text-muted-foreground">
                              {type.fee}
                            </span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">{type.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="w-full h-12 text-base font-semibold bg-primary mt-4"
                  >
                    {loading ? "Calculating Estimate..." : "Calculate Shipping Price"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Result Card */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="shadow-lg border bg-card overflow-hidden">
              <div className="bg-primary px-6 py-5 text-white">
                <span className="text-xs uppercase tracking-wider text-white/80 font-semibold">
                  Estimated Quote
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <h3 className="text-4xl font-extrabold tracking-tight">
                    ₹{calculatedCost?.parcelPrice || calculatedCost?.price || 1550}
                  </h3>
                  <span className="text-xs text-white/80 font-medium">all inclusive</span>
                </div>
              </div>

              <CardContent className="p-6 space-y-5">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Route</span>
                    <span className="font-semibold text-foreground">
                      {form.originCity} → {form.destinationCity}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-semibold text-foreground capitalize">
                      {form.parcelCategory?.replace("_", " ")}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Billable Weight</span>
                    <span className="font-semibold text-foreground">{form.parcelWeight} kg</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Service Tier</span>
                    <span className="font-semibold text-foreground capitalize">
                      {form.deliveryType} Delivery
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/40 border space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Doorstep Pickup & Live Tracking Included
                  </div>
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Complimentary Cargo Insurance up to ₹5,000
                  </div>
                </div>

                <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to="/contact">
                    Book This Shipment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border p-5 bg-card">
              <h4 className="font-semibold text-sm mb-3">Enterprise & Bulk Logistics?</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                For e-commerce volume discounts, automated API integrations, and dedicated freight solutions, connect directly with our business team.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-3 w-full">
                <Link to="/contact">Talk to Enterprise Sales</Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CalculateCostPage;
