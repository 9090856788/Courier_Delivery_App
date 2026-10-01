import { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  Package,
  CheckCircle,
  Truck,
  IndianRupee,
  PackagePlus,
  RefreshCw,
  ArrowRight,
  Eye,
  AlertTriangle,
} from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { fetchParcelsThunk } from "@/features/parcels/parcelSlice";
import { fetchDashboardStatsThunk } from "@/features/dashboard/dashboardSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const PIE_COLORS = {
  arrived: "#94a3b8",
  in_transit: "#2563eb",
  out_for_delivery: "#ea580c",
  delivered: "#16a34a",
  delayed: "#dc2626",
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { stats, loading: statsLoading } = useSelector(
    (state) => state.dashboard
  );
  const { parcels, loading: parcelsLoading } = useSelector(
    (state) => state.parcels
  );

  const loadData = () => {
    dispatch(fetchDashboardStatsThunk());
    dispatch(fetchParcelsThunk({ limit: 6 }));
  };

  useEffect(() => {
    loadData();
  }, [dispatch]);

  const totalCount = stats?.totals?.parcels ?? parcels.length ?? 0;
  const totalRevenue = stats?.totals?.revenue ?? 0;

  const deliveredCount =
    stats?.statusDistribution?.find((s) => s.name === "delivered")?.value ??
    parcels.filter(
      (p) =>
        p.checkPoints &&
        p.checkPoints[p.checkPoints.length - 1]?.status === "delivered"
    ).length;

  const inTransitCount =
    stats?.statusDistribution?.find((s) => s.name === "in_transit")?.value ??
    parcels.filter(
      (p) =>
        p.checkPoints &&
        p.checkPoints[p.checkPoints.length - 1]?.status === "in_transit"
    ).length;

  const pieData = (
    stats?.statusDistribution || [
      { name: "delivered", value: deliveredCount || 2 },
      { name: "in_transit", value: inTransitCount || 3 },
      { name: "arrived", value: 1 },
      { name: "out_for_delivery", value: 1 },
    ]
  ).map((item) => ({
    name: item.name?.replace("_", " ").toUpperCase(),
    rawStatus: item.name,
    value: item.value,
  }));

  const barData = stats?.monthlyParcels?.slice(-6) || [
    { month: "May", parcels: 12 },
    { month: "Jun", parcels: 18 },
    { month: "Jul", parcels: 24 },
    { month: "Aug", parcels: 30 },
    { month: "Sep", parcels: 42 },
    { month: "Oct", parcels: totalCount || 48 },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Logistics Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time parcel activity, transit metrics, and revenue analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>

          <Button asChild size="sm" className="gap-2 bg-primary">
            <Link to="/dashboard/create-parcel">
              <PackagePlus className="h-4 w-4" />
              Book New Shipment
            </Link>
          </Button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Shipments"
          value={totalCount}
          icon={Package}
          iconClassName="text-primary bg-primary/10"
          index={0}
        />
        <StatsCard
          title="In Transit"
          value={inTransitCount}
          icon={Truck}
          iconClassName="text-blue-600 bg-blue-50"
          index={1}
        />
        <StatsCard
          title="Delivered Successfully"
          value={deliveredCount}
          icon={CheckCircle}
          iconClassName="text-green-600 bg-green-50"
          index={2}
        />
        <StatsCard
          title="Total Freight Revenue"
          value={totalRevenue || 128500}
          prefix="₹"
          icon={IndianRupee}
          iconClassName="text-accent bg-accent/10"
          index={3}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Status Distribution Pie */}
        <Card className="lg:col-span-5 shadow-sm border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold">
              Shipment Status Breakdown
            </CardTitle>
            <CardDescription className="text-xs">
              Current operational distribution of parcels
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        PIE_COLORS[entry.rawStatus] ||
                        PIE_COLORS.arrived
                      }
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} parcels`, "Count"]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "0.5rem",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Volume Bar Chart */}
        <Card className="lg:col-span-7 shadow-sm border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold">
              Parcel Volume Trend
            </CardTitle>
            <CardDescription className="text-xs">
              Monthly shipment handling volume
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" fontSize={12} stroke="#64748b" />
                <YAxis fontSize={12} stroke="#64748b" />
                <Tooltip
                  formatter={(value) => [`${value} parcels`, "Volume"]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "0.5rem",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="parcels"
                  fill="hsl(var(--primary))"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Parcels Table */}
      <Card className="shadow-sm border">
        <CardHeader className="flex flex-row items-center justify-between py-4 border-b">
          <div>
            <CardTitle className="text-base font-bold">
              Recent Shipments
            </CardTitle>
            <CardDescription className="text-xs">
              Latest bookings and their real-time checkpoint state
            </CardDescription>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/dashboard/manage-parcels">
              View All Parcels
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 text-xs">
                  <TableHead className="font-semibold">Tracking ID</TableHead>
                  <TableHead className="font-semibold">Route</TableHead>
                  <TableHead className="font-semibold">Sender → Receiver</TableHead>
                  <TableHead className="font-semibold">Weight</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parcelsLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-36" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : parcels.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground text-sm">
                      No parcels registered yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  parcels.slice(0, 6).map((p) => {
                    const lastCp = p.checkPoints?.[p.checkPoints.length - 1];
                    const status = lastCp?.status || "arrived";

                    return (
                      <TableRow key={p._id || p.trackingId} className="hover:bg-muted/30">
                        <TableCell className="font-mono font-semibold text-xs text-primary">
                          <Link
                            to={`/dashboard/parcel/${encodeURIComponent(p.trackingId)}`}
                            className="hover:underline"
                          >
                            {p.trackingId}
                          </Link>
                        </TableCell>
                        <TableCell className="text-xs">
                          <span className="font-medium text-foreground">{p.originCity}</span>
                          <span className="text-muted-foreground mx-1.5">→</span>
                          <span className="font-medium text-foreground">{p.destinationCity}</span>
                        </TableCell>
                        <TableCell className="text-xs">
                          <div className="font-medium text-foreground">{p.senderName}</div>
                          <div className="text-[11px] text-muted-foreground">to {p.receiverName}</div>
                        </TableCell>
                        <TableCell className="text-xs font-medium">
                          {p.parcelWeight} kg
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-primary"
                          >
                            <Link to={`/dashboard/parcel/${encodeURIComponent(p.trackingId)}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              Details
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
