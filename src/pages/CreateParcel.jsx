import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  PackagePlus,
  Truck,
  CheckCircle2,
  Copy,
  Check,
  Eye,
  Search,
} from "lucide-react";
import { createParcelThunk } from "@/features/parcels/parcelSlice";
import { toast } from "sonner";
import {
  getDestinationOptionsForShipmentType,
  NATIONAL_CITY_OPTIONS,
} from "@/lib/locationData";
import { useNavigate, Link } from "react-router-dom";

const categories = [
  { value: "documents", label: "Documents & Paperwork" },
  { value: "electronics", label: "Electronics & High-Tech" },
  { value: "clothing", label: "Clothing & Textiles" },
  { value: "fragile", label: "Fragile / Glass" },
  { value: "food", label: "Food & Non-perishables" },
  { value: "medicine", label: "Pharmaceuticals & Healthcare" },
  { value: "cosmetics", label: "Cosmetics & Toiletries" },
  { value: "books", label: "Books & Educational" },
  { value: "small_package", label: "Small Package (< 3kg)" },
  { value: "large_package", label: "Large Package (Bulk)" },
  { value: "other", label: "General Merchandise" },
];

export default function CreateParcel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.parcels);

  const [form, setForm] = useState({
    senderName: "",
    senderPhoneNumber: "",
    senderAddress: "",
    receiverName: "",
    receiverPhoneNumber: "",
    receiverAddress: "",
    shipmentType: "National",
    originCity: "Bengaluru",
    destinationCity: "Mumbai",
    deliveryType: "standard",
    parcelCategory: "electronics",
    parcelWeight: 1.5,
    parcelSize: "medium",
    parcelDescription: "",
    deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  });

  const [createdParcel, setCreatedParcel] = useState(null);
  const [copied, setCopied] = useState(false);

  const destinationOptions = useMemo(
    () => getDestinationOptionsForShipmentType(form.shipmentType),
    [form.shipmentType]
  );

  const estimatedPrice = useMemo(() => {
    const w = parseFloat(form.parcelWeight) || 1;
    const base = form.originCity === form.destinationCity ? 50 : 100;
    const catFee = form.parcelCategory === "fragile" ? 250 : 120;
    const speedFee =
      form.deliveryType === "sameDay" ? 150 : form.deliveryType === "overnight" ? 80 : 0;
    if (form.shipmentType === "International") {
      return 13500 + Math.ceil(w) * 7500 + catFee + speedFee;
    }
    return Math.round(base + w * 500 + catFee + speedFee);
  }, [
    form.originCity,
    form.destinationCity,
    form.parcelWeight,
    form.parcelCategory,
    form.deliveryType,
    form.shipmentType,
  ]);

  const handleChange = (field, val) => {
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !form.senderName.trim() ||
      !form.senderPhoneNumber.trim() ||
      !form.senderAddress.trim() ||
      !form.receiverName.trim() ||
      !form.receiverPhoneNumber.trim() ||
      !form.receiverAddress.trim()
    ) {
      toast.error("Please fill all required sender and receiver contact fields");
      return;
    }

    const payload = {
      ...form,
      parcelWeight: parseFloat(form.parcelWeight) || 1,
      deliveryDate: new Date(form.deliveryDate).toISOString(),
    };

    const res = await dispatch(createParcelThunk(payload));
    if (res.meta.requestStatus === "fulfilled") {
      setCreatedParcel(res.payload?.data || res.payload);
    }
  };

  const copyId = () => {
    if (createdParcel?.trackingId) {
      navigator.clipboard.writeText(createdParcel.trackingId);
      setCopied(true);
      toast.success("Tracking ID copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetForm = () => {
    setCreatedParcel(null);
    setForm({
      senderName: "",
      senderPhoneNumber: "",
      senderAddress: "",
      receiverName: "",
      receiverPhoneNumber: "",
      receiverAddress: "",
      shipmentType: "National",
      originCity: "Bengaluru",
      destinationCity: "Mumbai",
      deliveryType: "standard",
      parcelCategory: "electronics",
      parcelWeight: 1.5,
      parcelSize: "medium",
      parcelDescription: "",
      deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Create Shipment Order
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Generate an official booking, assign barcodes, and schedule courier dispatch.
        </p>
      </div>

      <form onSubmit={handleCreate} className="space-y-6">
        {/* Route & Scope */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-base flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              Route & Service Tier
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 grid sm:grid-cols-3 gap-4">
            <div>
              <Label className="text-xs">Shipment Scope</Label>
              <Select
                value={form.shipmentType}
                onValueChange={(val) => {
                  handleChange("shipmentType", val);
                  handleChange(
                    "destinationCity",
                    val === "International" ? "United Kingdom, London" : "Mumbai"
                  );
                }}
              >
                <SelectTrigger className="mt-1 h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="National">National (Domestic)</SelectItem>
                  <SelectItem value="International">International</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs">Origin City</Label>
              <Select
                value={form.originCity}
                onValueChange={(val) => handleChange("originCity", val)}
              >
                <SelectTrigger className="mt-1 h-10">
                  <SelectValue />
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
              <Label className="text-xs">Destination Location</Label>
              <Select
                value={form.destinationCity}
                onValueChange={(val) => handleChange("destinationCity", val)}
              >
                <SelectTrigger className="mt-1 h-10">
                  <SelectValue />
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
          </CardContent>
        </Card>

        {/* Sender & Receiver Info */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Sender */}
          <Card className="border shadow-sm">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base">Sender Details</CardTitle>
              <CardDescription className="text-xs">Pickup and consignor information</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div>
                <Label className="text-xs">Full Name *</Label>
                <Input
                  value={form.senderName}
                  onChange={(e) => handleChange("senderName", e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="mt-1 h-10"
                  required
                />
              </div>

              <div>
                <Label className="text-xs">Phone Number *</Label>
                <Input
                  value={form.senderPhoneNumber}
                  onChange={(e) => handleChange("senderPhoneNumber", e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="mt-1 h-10"
                  required
                />
              </div>

              <div>
                <Label className="text-xs">Pickup Address *</Label>
                <Textarea
                  value={form.senderAddress}
                  onChange={(e) => handleChange("senderAddress", e.target.value)}
                  placeholder="Street, Building, Landmark, Pincode"
                  rows={2}
                  className="mt-1"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Receiver */}
          <Card className="border shadow-sm">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base">Receiver Details</CardTitle>
              <CardDescription className="text-xs">Consignee and delivery destination</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div>
                <Label className="text-xs">Full Name *</Label>
                <Input
                  value={form.receiverName}
                  onChange={(e) => handleChange("receiverName", e.target.value)}
                  placeholder="e.g. Priya Patel"
                  className="mt-1 h-10"
                  required
                />
              </div>

              <div>
                <Label className="text-xs">Phone Number *</Label>
                <Input
                  value={form.receiverPhoneNumber}
                  onChange={(e) => handleChange("receiverPhoneNumber", e.target.value)}
                  placeholder="e.g. +91 98123 45678"
                  className="mt-1 h-10"
                  required
                />
              </div>

              <div>
                <Label className="text-xs">Delivery Address *</Label>
                <Textarea
                  value={form.receiverAddress}
                  onChange={(e) => handleChange("receiverAddress", e.target.value)}
                  placeholder="Recipient door number, area, postal code"
                  rows={2}
                  className="mt-1"
                  required
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Parcel Package Specifications */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-base">Package Specifications</CardTitle>
          </CardHeader>
          <CardContent className="p-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label className="text-xs">Category</Label>
              <Select
                value={form.parcelCategory}
                onValueChange={(val) => handleChange("parcelCategory", val)}
              >
                <SelectTrigger className="mt-1 h-10">
                  <SelectValue />
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
              <Label className="text-xs">Delivery Speed</Label>
              <Select
                value={form.deliveryType}
                onValueChange={(val) => handleChange("deliveryType", val)}
              >
                <SelectTrigger className="mt-1 h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard (2-4 Days)</SelectItem>
                  <SelectItem value="overnight">Overnight Express</SelectItem>
                  <SelectItem value="sameDay">Same Day Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs">Package Weight (kg)</Label>
              <Input
                type="number"
                step="0.1"
                min="0.1"
                value={form.parcelWeight}
                onChange={(e) => handleChange("parcelWeight", e.target.value)}
                className="mt-1 h-10"
                required
              />
            </div>

            <div>
              <Label className="text-xs">Package Size</Label>
              <Select
                value={form.parcelSize}
                onValueChange={(val) => handleChange("parcelSize", val)}
              >
                <SelectTrigger className="mt-1 h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small Box (Shoebox)</SelectItem>
                  <SelectItem value="medium">Medium Carton</SelectItem>
                  <SelectItem value="large">Large Freight Crate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-2">
              <Label className="text-xs">Expected Delivery Target</Label>
              <Input
                type="date"
                value={form.deliveryDate}
                onChange={(e) => handleChange("deliveryDate", e.target.value)}
                className="mt-1 h-10"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <Label className="text-xs">Contents Description / Handling Instructions</Label>
              <Input
                value={form.parcelDescription}
                onChange={(e) => handleChange("parcelDescription", e.target.value)}
                placeholder="e.g. Fragile electronics, handle with extreme care"
                className="mt-1 h-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing Summary & Action */}
        <div className="p-6 rounded-2xl bg-primary/5 border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase">
              Calculated Rate
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <h3 className="text-3xl font-extrabold text-foreground">
                ₹{estimatedPrice}
              </h3>
              <span className="text-xs text-muted-foreground">
                automated server calculation on booking
              </span>
            </div>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              className="flex-1 sm:flex-none"
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 sm:flex-none bg-primary px-8 h-11 text-base font-semibold"
            >
              <PackagePlus className="h-4 w-4 mr-2" />
              {loading ? "Generating Waybill..." : "Confirm & Book Parcel"}
            </Button>
          </div>
        </div>
      </form>

      {/* Success Modal */}
      <Dialog
        open={Boolean(createdParcel)}
        onOpenChange={(open) => !open && setCreatedParcel(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <DialogTitle className="text-center text-xl font-bold">
              Parcel Created Successfully!
            </DialogTitle>
            <DialogDescription className="text-center text-xs">
              Waybill generated and barcode assigned to this shipment.
            </DialogDescription>
          </DialogHeader>

          <div className="p-4 rounded-xl bg-muted/50 border text-center space-y-2 my-2">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Assigned Tracking ID
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl font-mono font-extrabold text-primary">
                {createdParcel?.trackingId}
              </span>
              <button
                type="button"
                onClick={copyId}
                className="p-1.5 hover:bg-card rounded-md border text-muted-foreground hover:text-foreground transition"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Total Freight Cost: ₹{createdParcel?.parcelPrice}
            </p>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={resetForm}
              className="w-full sm:w-auto"
            >
              Book Another
            </Button>
            <Button
              asChild
              className="w-full sm:w-auto bg-primary"
            >
              <Link
                to={`/dashboard/parcel/${encodeURIComponent(
                  createdParcel?.trackingId || ""
                )}`}
              >
                <Eye className="h-4 w-4 mr-1.5" />
                View Details
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
