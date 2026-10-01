import { motion } from "framer-motion";
import { CheckCircle, Circle, MapPin, Clock, AlertTriangle, Truck } from "lucide-react";

export function TrackingTimeline({ checkpoints = [] }) {
  if (!checkpoints || checkpoints.length === 0) {
    return (
      <div className="p-6 text-center text-sm text-muted-foreground border rounded-lg bg-muted/20">
        No tracking checkpoints recorded yet.
      </div>
    );
  }

  const getStatusIcon = (status, isLatest) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />;
      case "delayed":
        return <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />;
      case "out_for_delivery":
        return <Truck className="h-5 w-5 text-accent shrink-0" />;
      default:
        return isLatest ? (
          <Circle className="h-5 w-5 text-primary fill-primary/30 shrink-0" />
        ) : (
          <CheckCircle className="h-5 w-5 text-muted-foreground/80 shrink-0" />
        );
    }
  };

  return (
    <div className="relative space-y-0 py-2">
      {checkpoints.map((cp, i) => {
        const isLatest = i === checkpoints.length - 1;
        const isDelivered = cp.status === "delivered";

        return (
          <motion.div
            key={cp._id || i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className="relative flex gap-4 pb-8 last:pb-2"
          >
            <div className="flex flex-col items-center">
              {getStatusIcon(cp.status, isLatest)}
              {!isLatest && (
                <div
                  className={`w-0.5 flex-1 mt-1.5 ${
                    isDelivered ? "bg-green-500" : "bg-border"
                  }`}
                />
              )}
            </div>

            <div className="flex-1 -mt-0.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-foreground capitalize">
                  {cp.title || cp.status?.replace("_", " ")}
                </p>
                <span className="inline-flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {cp.createdAt
                    ? new Date(cp.createdAt).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Recently updated"}
                </span>
              </div>

              {cp.description && (
                <p className="text-sm text-muted-foreground mt-1">{cp.description}</p>
              )}

              <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-foreground/80">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span>{cp.location}</span>
                {cp.updatedBy && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">Updated by {cp.updatedBy}</span>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default TrackingTimeline;
