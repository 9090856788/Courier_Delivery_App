import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export function StatsCard({
  title,
  value,
  icon: Icon,
  prefix = "",
  suffix = "",
  index = 0,
  iconClassName = "text-primary bg-primary/10",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="hover:shadow-md transition-shadow border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <h3 className="text-2xl font-bold mt-2 text-foreground">
                {prefix}
                {typeof value === "number" ? value.toLocaleString() : value ?? 0}
                {suffix}
              </h3>
            </div>
            {Icon && (
              <div className={`p-3 rounded-xl flex items-center justify-center ${iconClassName}`}>
                <Icon className="h-6 w-6" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default StatsCard;
