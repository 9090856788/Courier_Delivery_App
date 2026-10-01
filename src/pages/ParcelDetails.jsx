import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { TrackingTimeline } from "@/components/TrackingTimeline";
import {
  ArrowLeft,
  Package,
  MapPin,
  Truck,
  PlusCircle,
  Copy,
  Check,
  Calendar,
  DollarSign,
  Scale,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { Input } from "@/components/ui/input";
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
  getParcelByIdThunk,
  addCheckpointThunk,
} from "@/features/parcels/parcelSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function ParcelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentParcel: parcel, loading } = useSelector(
    (state) => state.parcels
  );

  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [cpForm, setCpForm] = useState({
    status: "in_transit",
    location: "",
    title: "",
    description: "",
  });
  const [submittingCp, setSubmittingCp] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getParcelByIdThunk(id));
    }
  }, [id, dispatch]);

  const copyId = () => {
    if (parcel?.trackingId) {
      navigator.clipboard.writeText(parcel.trackingId);
      setCopied(true);
      toast.success("Tracking ID copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddCheckpoint = async (e) => {
    e.preventDefault();
    if (!cpForm.location.trim() || !cpForm.title.trim()) {
      toast.error("Please fill in location and title");
      return;
    }

    try {
      setSubmittingCp(true);
      await dispatch(
        addCheckpointThunk({
          trackingId: parcel.trackingId,
          checkpointData: cpForm,
        })
      ).unwrap();
      setModalOpen(false);
      dispatch(getParcelByIdThunk(id));
    } catch (err) {
      // Handled in thunk
    } finally {
      setSubmittingCp(false);
    }
  };

  if (loading && !parcel) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-48 w-full" />
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!parcel) {
    return (
      <div className="text-center py-16 bg-card border rounded-2xl">
        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
        <h2 className="text-xl font-bold">Parcel Not Found</h2>
        <p className="text-sm text-muted-foreground mt-1">
          No consignment was found for ID "{id}".
        </p>
        <Button asChild className="mt-4" variant="outline">
          <Link to="/dashboard/manage-parcels">← Back to Manage Parcels</Link>
        </Button>
      </div>
    );
  }

  const lastCp = parcel.checkPoints?.[parcel.checkPoints.length - 1];
  const currentStatus = lastCp?.status || "arrived";

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/dashboard/manage-parcels")}
            title="Back to all parcels"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold font-mono text-foreground">
                {parcel.trackingId}
              </h1>
              <button
                type="button"
                onClick={copyId}
                className="p-1 text-muted-foreground hover:text-foreground"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Booked on {new Date(parcel.createdAt).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge status={currentStatus} />
          <Button
            onClick={() => {
              setCpForm({
                status: "in_transit",
                location: parcel.destinationCity || "Hub",
                title: "In Transit",
                description: "",
              });
              setModalOpen(true);
            }}
            className="gap-2 bg-primary"
          >
            <PlusCircle className="h-4 w-4" />
            Add Checkpoint
          </Button>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Shipment Specs & Parties */}
        <div className="lg:col-span-7 space-y-6">
          {/* Route Overview */}
          <Card className="border shadow-sm">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" />
                Transit Route & Service Tier
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/40 border">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Origin</p>
                  <p className="text-base font-bold text-foreground">{parcel.originCity}</p>
                </div>
                <div className="text-center px-4">
                  <span className="text-xs font-semibold text-primary uppercase">
                    {parcel.deliveryType} • {parcel.shipmentType}
                  </span>
                  <div className="w-24 h-0.5 bg-primary/40 my-1 mx-auto" />
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Destination</p>
                  <p className="text-base font-bold text-foreground">{parcel.destinationCity}</p>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-lg border bg-card">
                  <span className="text-muted-foreground">Category</span>
                  <p className="font-semibold text-foreground text-sm mt-0.5 capitalize">
                    {parcel.parcelCategory?.replace("_", " ")}
                  </p>
                </div>
                <div className="p-3 rounded-lg border bg-card">
                  <span className="text-muted-foreground">Weight</span>
                  <p className="font-semibold text-foreground text-sm mt-0.5">
                    {parcel.parcelWeight} kg
                  </p>
                </div>
                <div className="p-3 rounded-lg border bg-card">
                  <span className="text-muted-foreground">Total Price</span>
                  <p className="font-semibold text-foreground text-sm mt-0.5">
                    ₹{parcel.parcelPrice}
                  </p>
                </div>
                <div className="p-3 rounded-lg border bg-card">
                  <span className="text-muted-foreground">Target Date</span>
                  <p className="font-semibold text-foreground text-sm mt-0.5">
                    {new Date(parcel.deliveryDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
              </div>

              {parcel.parcelDescription && (
                <div className="p-3 rounded-lg border bg-muted/20 text-xs">
                  <span className="font-semibold text-foreground">Package Instructions:</span>{" "}
                  <span className="text-muted-foreground">{parcel.parcelDescription}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Consignor & Consignee */}
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="border shadow-sm">
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-sm">Sender (Consignor)</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-1.5 text-xs">
                <p className="font-bold text-sm text-foreground">{parcel.senderName}</p>
                <p className="text-muted-foreground">{parcel.senderPhoneNumber}</p>
                <p className="text-muted-foreground pt-1">{parcel.senderAddress}</p>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-sm">Receiver (Consignee)</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-1.5 text-xs">
                <p className="font-bold text-sm text-foreground">{parcel.receiverName}</p>
                <p className="text-muted-foreground">{parcel.receiverPhoneNumber}</p>
                <p className="text-muted-foreground pt-1">{parcel.receiverAddress}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column: Checkpoints Timeline */}
        <div className="lg:col-span-5">
          <Card className="border shadow-sm">
            <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Checkpoint Timeline</CardTitle>
                <CardDescription className="text-xs">
                  Real-time scan logs and status history
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCpForm({
                    status: "in_transit",
                    location: parcel.destinationCity || "Hub",
                    title: "In Transit",
                    description: "",
                  });
                  setModalOpen(true);
                }}
                className="h-8 text-xs gap-1"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                Update
              </Button>
            </CardHeader>
            <CardContent className="p-5">
              <TrackingTimeline checkpoints={parcel.checkPoints} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Checkpoint Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleAddCheckpoint}>
            <DialogHeader>
              <DialogTitle className="text-lg">Record Checkpoint</DialogTitle>
              <DialogDescription className="text-xs">
                Update status for parcel{" "}
                <span className="font-mono font-bold text-primary">{parcel.trackingId}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <Label className="text-xs">New Status</Label>
                <Select
                  value={cpForm.status}
                  onValueChange={(val) =>
                    setCpForm((p) => ({
                      ...p,
                      status: val,
                      title:
                        val === "delivered"
                          ? "Delivered to Recipient"
                          : val === "out_for_delivery"
                          ? "Out for Delivery"
                          : val === "delayed"
                          ? "Delayed in Transit"
                          : "Departed Sorting Hub",
                    }))
                  }
                >
                  <SelectTrigger className="mt-1 h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in_transit">In Transit</SelectItem>
                    <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="delayed">Delayed</SelectItem>
                    <SelectItem value="arrived">Arrived at Facility</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs">Location *</Label>
                <Input
                  value={cpForm.location}
                  onChange={(e) =>
                    setCpForm((p) => ({ ...p, location: e.target.value }))
                  }
                  placeholder="e.g. Nagpur Sorting Hub"
                  className="mt-1 h-10"
                  required
                />
              </div>

              <div>
                <Label className="text-xs">Checkpoint Title *</Label>
                <Input
                  value={cpForm.title}
                  onChange={(e) =>
                    setCpForm((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="e.g. Processed at Central Hub"
                  className="mt-1 h-10"
                  required
                />
              </div>

              <div>
                <Label className="text-xs">Public Note / Description</Label>
                <Textarea
                  value={cpForm.description}
                  onChange={(e) =>
                    setCpForm((p) => ({ ...p, description: e.target.value }))
                  }
                  placeholder="Optional details visible to customer..."
                  rows={2}
                  className="mt-1"
                />
              </div>
            </div>

            <DialogFooter className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submittingCp} className="bg-primary">
                {submittingCp ? "Saving..." : "Save Checkpoint"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
