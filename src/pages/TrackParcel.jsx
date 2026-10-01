import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Package,
  AlertCircle,
  Truck,
  ArrowRight,
  Copy,
  Check,
  Calendar,
  Scale,
  DollarSign,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/StatusBadge";
import { TrackingTimeline } from "@/components/TrackingTimeline";
import { useDispatch, useSelector } from "react-redux";
import { trackParcelThunk, clearTrack } from "@/features/parcels/parcelSlice";
import { toast } from "sonner";

const SAMPLE_IDS = [
  { id: "IND-82914710", label: "Out for Delivery (Electronics)" },
  { id: "IND-39182741", label: "Delivered (Documents)" },
  { id: "IND-57192830", label: "In Transit (Fragile)" },
  { id: "IND-92837415", label: "Delivered (Medicine)" },
];

const TrackParcel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { trackingParcel: parcel, trackingLoading: loading, error } = useSelector(
    (state) => state.parcels
  );

  const [inputTrackingId, setInputTrackingId] = useState("");
  const [copied, setCopied] = useState(false);

  const idFromUrl = searchParams.get("id");

  useEffect(() => {
    if (idFromUrl) {
      setInputTrackingId(idFromUrl);
      dispatch(trackParcelThunk(idFromUrl));
    }
  }, [idFromUrl, dispatch]);

  const handleSearch = (idToSearch) => {
    const tid = (idToSearch || inputTrackingId).trim();
    if (!tid) {
      toast.error("Please enter a valid Tracking ID");
      return;
    }
    setSearchParams({ id: tid });
    dispatch(trackParcelThunk(tid));
  };

  const copyTrackingId = (id) => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    toast.success("Tracking ID copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen pt-24 pb-16 bg-muted/20">
      <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
            Live Shipment Tracking
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Track Your Parcel
          </h1>
          <p className="mt-3 text-muted-foreground text-base">
            Enter your unique tracking code below for real-time checkpoint updates and delivery timeline.
          </p>
        </div>

        {/* Search Box */}
        <Card className="shadow-lg border bg-card mb-8">
          <CardContent className="p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="e.g. IND-82914710"
                  value={inputTrackingId}
                  onChange={(e) => setInputTrackingId(e.target.value)}
                  className="pl-11 h-12 text-base font-mono"
                />
              </div>
              <Button type="submit" size="lg" disabled={loading} className="px-8 h-12 bg-primary">
                {loading ? "Locating..." : "Track Shipment"}
              </Button>
            </form>

            {/* Quick Demo Chips */}
            <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t">
              <span className="text-xs font-medium text-muted-foreground mr-1">
                Try demo IDs:
              </span>
              {SAMPLE_IDS.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => {
                    setInputTrackingId(sample.id);
                    handleSearch(sample.id);
                  }}
                  className="text-xs font-mono bg-muted hover:bg-primary/10 hover:text-primary px-2.5 py-1 rounded-md transition-colors border border-border"
                >
                  {sample.id} <span className="text-[10px] text-muted-foreground">({sample.label})</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-20 w-full" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Error State */}
        {!loading && error && !parcel && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 px-6 border rounded-2xl bg-card shadow-sm"
          >
            <div className="h-14 w-14 rounded-full bg-destructive/10 text-destructive mx-auto flex items-center justify-center mb-4">
              <AlertCircle className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Shipment Not Found</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
              We couldn't locate a package matching tracking ID{" "}
              <span className="font-mono font-semibold text-foreground">
                "{inputTrackingId}"
              </span>
              . Please verify the code or try one of the demo tracking numbers above.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button variant="outline" onClick={() => handleSearch(SAMPLE_IDS[0].id)}>
                Load Demo Shipment
              </Button>
              <Button asChild variant="secondary">
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </motion.div>
        )}

        {/* Parcel Details Result */}
        {!loading && parcel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Header Status Card */}
            <Card className="border shadow-md overflow-hidden bg-card">
              <div className="bg-primary/5 px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-sm">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg md:text-xl font-mono font-bold tracking-tight text-foreground">
                        {parcel.trackingId}
                      </span>
                      <button
                        onClick={() => copyTrackingId(parcel.trackingId)}
                        className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition"
                        title="Copy tracking ID"
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Booked on {new Date(parcel.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {parcel.checkPoints?.length > 0 && (
                    <StatusBadge
                      status={
                        parcel.checkPoints[parcel.checkPoints.length - 1].status
                      }
                    />
                  )}
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20 uppercase tracking-wide">
                    {parcel.shipmentType}
                  </span>
                </div>
              </div>

              {/* Transit Route Visualization */}
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-4 px-6 rounded-xl bg-muted/40 border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold">Origin</p>
                      <h4 className="text-base font-bold text-foreground">{parcel.originCity}</h4>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col items-center max-w-xs w-full px-4">
                    <span className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Truck className="h-3.5 w-3.5" />
                      {parcel.deliveryType} Delivery
                    </span>
                    <div className="w-full flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <div className="h-0.5 flex-1 bg-primary/40 relative">
                        <ArrowRight className="h-4 w-4 text-primary absolute right-0 -top-1.5" />
                      </div>
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold">Destination</p>
                      <h4 className="text-base font-bold text-foreground">{parcel.destinationCity}</h4>
                    </div>
                  </div>
                </div>

                {/* Key Spec Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  <div className="p-3.5 rounded-xl border bg-card">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                      <Scale className="h-3.5 w-3.5 text-primary" />
                      <span>Weight</span>
                    </div>
                    <p className="text-base font-bold text-foreground">{parcel.parcelWeight} kg</p>
                  </div>

                  <div className="p-3.5 rounded-xl border bg-card">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                      <Package className="h-3.5 w-3.5 text-primary" />
                      <span>Category</span>
                    </div>
                    <p className="text-base font-bold text-foreground capitalize">
                      {parcel.parcelCategory?.replace("_", " ")}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border bg-card">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                      <DollarSign className="h-3.5 w-3.5 text-primary" />
                      <span>Shipping Fee</span>
                    </div>
                    <p className="text-base font-bold text-foreground">₹{parcel.parcelPrice}</p>
                  </div>

                  <div className="p-3.5 rounded-xl border bg-card">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      <span>Est. Delivery</span>
                    </div>
                    <p className="text-base font-bold text-foreground">
                      {parcel.deliveryDate
                        ? new Date(parcel.deliveryDate).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })
                        : "Pending"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline Section */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="border shadow-md">
                  <CardHeader className="border-b pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Tracking History
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <TrackingTimeline checkpoints={parcel.checkPoints} />
                  </CardContent>
                </Card>
              </div>

              {/* Sender & Receiver Card */}
              <div className="space-y-6">
                <Card className="border shadow-md">
                  <CardHeader className="border-b pb-3">
                    <CardTitle className="text-base">Sender & Receiver</CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 space-y-5 text-sm">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase">Sender</p>
                      <p className="font-semibold text-foreground mt-0.5">{parcel.senderName}</p>
                      <p className="text-xs text-muted-foreground">{parcel.senderPhoneNumber}</p>
                      <p className="text-xs text-muted-foreground mt-1">{parcel.senderAddress}</p>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-xs font-semibold text-muted-foreground uppercase">Receiver</p>
                      <p className="font-semibold text-foreground mt-0.5">{parcel.receiverName}</p>
                      <p className="text-xs text-muted-foreground">{parcel.receiverPhoneNumber}</p>
                      <p className="text-xs text-muted-foreground mt-1">{parcel.receiverAddress}</p>
                    </div>

                    {parcel.parcelDescription && (
                      <div className="pt-4 border-t">
                        <p className="text-xs font-semibold text-muted-foreground uppercase">Package Notes</p>
                        <p className="text-xs text-muted-foreground mt-1 italic">
                          "{parcel.parcelDescription}"
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Trust badge */}
                <div className="p-4 rounded-xl border bg-primary/5 flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div className="text-xs text-muted-foreground">
                    <p className="font-semibold text-foreground">Verified CargoPilot Protection</p>
                    <p className="mt-0.5">
                      Your parcel is backed by round-the-clock barcode scans and automated courier dispatch notifications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default TrackParcel;
