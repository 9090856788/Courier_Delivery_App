import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { StatusBadge } from "@/components/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Filter,
  Eye,
  RefreshCw,
  PackagePlus,
  PlusCircle,
  Truck,
  MapPin,
  Calendar,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  fetchParcelsThunk,
  addCheckpointThunk,
} from "@/features/parcels/parcelSlice";
import { toast } from "sonner";

export default function ManageParcels() {
  const dispatch = useDispatch();
  const { parcels, pagination, loading } = useSelector(
    (state) => state.parcels
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  // Add Checkpoint modal state
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [cpForm, setCpForm] = useState({
    status: "in_transit",
    location: "",
    title: "",
    description: "",
  });
  const [submittingCp, setSubmittingCp] = useState(false);

  const loadParcels = (pageToLoad = page) => {
    const params = { page: pageToLoad, limit: 10 };
    if (search.trim()) params.search = search.trim();
    if (statusFilter && statusFilter !== "all") params.status = statusFilter;
    dispatch(fetchParcelsThunk(params));
  };

  useEffect(() => {
    loadParcels(1);
    setPage(1);
  }, [statusFilter, dispatch]);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    setPage(1);
    loadParcels(1);
  };

  const openCheckpointModal = (parcel) => {
    setSelectedParcel(parcel);
    setCpForm({
      status: "in_transit",
      location: parcel.destinationCity || "Hub",
      title: "Parcel In Transit",
      description: `Package proceeding towards ${parcel.destinationCity}`,
    });
  };

  const handleAddCheckpoint = async (e) => {
    e.preventDefault();
    if (!selectedParcel || !cpForm.location.trim() || !cpForm.title.trim()) {
      toast.error("Please fill in location and title");
      return;
    }

    try {
      setSubmittingCp(true);
      await dispatch(
        addCheckpointThunk({
          trackingId: selectedParcel.trackingId,
          checkpointData: cpForm,
        })
      ).unwrap();
      setSelectedParcel(null);
      loadParcels(page);
    } catch (err) {
      // Handled in thunk
    } finally {
      setSubmittingCp(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Manage Parcels
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Search, filter, inspect history, and dispatch real-time checkpoint updates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => loadParcels(page)}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>

          <Button asChild size="sm" className="gap-2 bg-primary">
            <Link to="/dashboard/create-parcel">
              <PackagePlus className="h-4 w-4" />
              New Shipment
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <Card className="border shadow-sm">
        <CardContent className="p-4">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col sm:flex-row gap-3 items-center justify-between"
          >
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by Tracking ID (e.g. IND-82914710)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-10"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-48">
                <Select
                  value={statusFilter}
                  onValueChange={(val) => setStatusFilter(val)}
                >
                  <SelectTrigger className="h-10">
                    <Filter className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="arrived">Arrived</SelectItem>
                    <SelectItem value="in_transit">In Transit</SelectItem>
                    <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="delayed">Delayed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" size="sm" className="h-10 px-5">
                Filter
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Parcels Table Card */}
      <Card className="border shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 text-xs">
                  <TableHead className="font-semibold">Tracking ID</TableHead>
                  <TableHead className="font-semibold">Sender</TableHead>
                  <TableHead className="font-semibold">Receiver</TableHead>
                  <TableHead className="font-semibold">Route</TableHead>
                  <TableHead className="font-semibold">Category / Wt</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Booked</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : parcels.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-sm text-muted-foreground">
                      No parcels matched the criteria. Try clearing search or filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  parcels.map((p) => {
                    const lastCp = p.checkPoints?.[p.checkPoints.length - 1];
                    const status = lastCp?.status || "arrived";

                    return (
                      <TableRow key={p._id || p.trackingId} className="hover:bg-muted/30">
                        <TableCell className="font-mono font-bold text-xs text-primary">
                          <Link
                            to={`/dashboard/parcel/${encodeURIComponent(p.trackingId)}`}
                            className="hover:underline"
                          >
                            {p.trackingId}
                          </Link>
                        </TableCell>
                        <TableCell className="text-xs">
                          <span className="font-medium text-foreground">{p.senderName}</span>
                          <span className="block text-[11px] text-muted-foreground">
                            {p.originCity}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs">
                          <span className="font-medium text-foreground">{p.receiverName}</span>
                          <span className="block text-[11px] text-muted-foreground">
                            {p.destinationCity}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs">
                          <div className="font-medium">{p.originCity} → {p.destinationCity}</div>
                          <span className="text-[10px] text-muted-foreground capitalize">
                            {p.shipmentType} • {p.deliveryType}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs">
                          <span className="capitalize">{p.parcelCategory?.replace("_", " ")}</span>
                          <span className="block text-[11px] text-muted-foreground">
                            {p.parcelWeight} kg • ₹{p.parcelPrice}
                          </span>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={status} />
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(p.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openCheckpointModal(p)}
                              title="Add Checkpoint"
                              className="h-8 px-2 text-xs"
                            >
                              <PlusCircle className="h-3.5 w-3.5 mr-1 text-primary" />
                              Update
                            </Button>
                            <Button
                              asChild
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <Link
                                to={`/dashboard/parcel/${encodeURIComponent(
                                  p.trackingId
                                )}`}
                              >
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t text-xs text-muted-foreground">
              <span>
                Showing page {pagination.page} of {pagination.totalPages} ({pagination.total} parcels)
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!pagination.hasPreviousPage}
                  onClick={() => {
                    const prev = pagination.page - 1;
                    setPage(prev);
                    loadParcels(prev);
                  }}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!pagination.hasNextPage}
                  onClick={() => {
                    const next = pagination.page + 1;
                    setPage(next);
                    loadParcels(next);
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Checkpoint Dialog */}
      <Dialog
        open={Boolean(selectedParcel)}
        onOpenChange={(open) => !open && setSelectedParcel(null)}
      >
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleAddCheckpoint}>
            <DialogHeader>
              <DialogTitle className="text-lg">Add Shipment Checkpoint</DialogTitle>
              <DialogDescription className="text-xs">
                Record new transit progress for{" "}
                <span className="font-mono font-bold text-primary">
                  {selectedParcel?.trackingId}
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <Label className="text-xs">New Status</Label>
                <Select
                  value={cpForm.status}
                  onValueChange={(val) => {
                    setCpForm((p) => ({
                      ...p,
                      status: val,
                      title:
                        val === "delivered"
                          ? "Delivered to Recipient"
                          : val === "out_for_delivery"
                          ? "Out for Delivery"
                          : val === "delayed"
                          ? "Weather / Clearance Delay"
                          : "Departed Facility",
                    }));
                  }}
                >
                  <SelectTrigger className="mt-1 h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in_transit">In Transit</SelectItem>
                    <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="delayed">Delayed</SelectItem>
                    <SelectItem value="arrived">Arrived at Hub</SelectItem>
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
                  placeholder="e.g. Mumbai Sorting Center"
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
                  placeholder="e.g. Package arrived at local hub"
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
                onClick={() => setSelectedParcel(null)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submittingCp} className="bg-primary">
                {submittingCp ? "Saving Checkpoint..." : "Save Checkpoint"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
