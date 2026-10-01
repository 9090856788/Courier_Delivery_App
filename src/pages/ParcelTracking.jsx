import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrackingTimeline } from "@/components/TrackingTimeline";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Search,
  Package,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  User,
  Eye,
} from "lucide-react";
import { trackParcelThunk } from "@/features/parcels/parcelSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function ParcelTracking() {
  const dispatch = useDispatch();
  const { trackingParcel: parcel, trackingLoading: loading, error } = useSelector(
    (state) => state.parcels
  );

  const [trackingId, setTrackingId] = useState("");

  const handleSearch = (tid = trackingId) => {
    const clean = tid.trim();
    if (!clean) {
      toast.error("Please enter a Tracking ID");
      return;
    }
    dispatch(trackParcelThunk(clean));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Parcel Audit & Tracking
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Internal tracking console for package inspection and status verification.
        </p>
      </div>

      {/* Search Input Card */}
      <Card className="border shadow-sm">
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
                placeholder="Enter Waybill Tracking ID (e.g. IND-82914710)..."
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="pl-11 h-12 font-mono text-base"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="px-8 h-12 bg-primary font-semibold"
            >
              {loading ? "Searching..." : "Inspect Parcel"}
            </Button>
          </form>

          {/* Quick suggestions */}
          <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t">
            <span className="text-xs font-medium text-muted-foreground">
              Recent Tracking IDs:
            </span>
            {["IND-82914710", "IND-39182741", "IND-57192830", "IND-61928374"].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setTrackingId(id);
                  handleSearch(id);
                }}
                className="text-xs font-mono bg-muted hover:bg-primary/10 hover:text-primary px-2.5 py-1 rounded transition border"
              >
                {id}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Loading Skeleton */}
      {loading && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      )}

      {/* Result Display */}
      {!loading && parcel && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="border shadow-sm">
            <CardHeader className="py-4 border-b flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-mono font-bold text-foreground">
                    {parcel.trackingId}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {parcel.originCity} → {parcel.destinationCity} • {parcel.shipmentType}
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
                <Button asChild size="sm" variant="outline">
                  <Link to={`/dashboard/parcel/${encodeURIComponent(parcel.trackingId)}`}>
                    <Eye className="h-4 w-4 mr-1.5" />
                    Full Record
                  </Link>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-3 rounded-lg border bg-muted/20">
                <span className="text-muted-foreground uppercase font-semibold">Sender</span>
                <p className="font-semibold text-foreground text-sm mt-0.5">{parcel.senderName}</p>
                <p className="text-muted-foreground mt-0.5">{parcel.senderPhoneNumber}</p>
              </div>
              <div className="p-3 rounded-lg border bg-muted/20">
                <span className="text-muted-foreground uppercase font-semibold">Receiver</span>
                <p className="font-semibold text-foreground text-sm mt-0.5">{parcel.receiverName}</p>
                <p className="text-muted-foreground mt-0.5">{parcel.receiverPhoneNumber}</p>
              </div>
              <div className="p-3 rounded-lg border bg-muted/20">
                <span className="text-muted-foreground uppercase font-semibold">Weight & Fee</span>
                <p className="font-semibold text-foreground text-sm mt-0.5">{parcel.parcelWeight} kg</p>
                <p className="text-muted-foreground mt-0.5">₹{parcel.parcelPrice} ({parcel.deliveryType})</p>
              </div>
              <div className="p-3 rounded-lg border bg-muted/20">
                <span className="text-muted-foreground uppercase font-semibold">Audit Record</span>
                <p className="font-semibold text-foreground text-sm mt-0.5">Created By Admin</p>
                <p className="text-muted-foreground mt-0.5">
                  {new Date(parcel.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="border shadow-sm">
            <CardHeader className="py-4 border-b">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Transit Checkpoints Log
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <TrackingTimeline checkpoints={parcel.checkPoints} />
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
