import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ArrowRight,
  Package,
  Search,
  ShieldCheck,
  Truck,
  MapPinned,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -40,
  },

  visible: {
    opacity: 1,
    x: 0,
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 40,
  },

  visible: {
    opacity: 1,
    x: 0,
  },
};

const Hero = () => {
  const navigate = useNavigate();

  const [trackingId, setTrackingId] = useState("");

  const handleTrack = () => {
    const id = trackingId.trim();

    if (!id) return;

    navigate(`/track?id=${encodeURIComponent(id)}`);
  };

  return (
    <section className="relative overflow-hidden pt-20">
      {/* Background */}

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-50 via-white to-blue-50" />

      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid items-center gap-16 py-20 lg:grid-cols-2">
          {/* Left */}

          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.6,
            }}
          >
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              🚚 Smart Logistics Platform
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-foreground md:text-6xl">
              Deliver Smarter.
              <br />
              Ship Faster with
              <span className="text-primary"> CargoPilot</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              CargoPilot helps businesses and individuals streamline logistics
              with secure shipping, real-time parcel tracking and reliable
              delivery solutions across India.
            </p>

            {/* Tracking Card */}

            <Card className="mt-10 border shadow-md">
              <CardContent className="space-y-5 p-6">
                <div>
                  <h3 className="text-lg font-semibold">Track Your Shipment</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Enter your tracking ID to get the latest shipment status.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    value={trackingId}
                    placeholder="Enter Tracking ID"
                    onChange={(e) => setTrackingId(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                    className="h-12"
                  />

                  <Button onClick={handleTrack} size="lg" className="sm:px-8">
                    <Search className="mr-2 h-4 w-4" />
                    Track
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/calculate">
                  Calculate Shipping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </motion.div>
          {/* Right */}

          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative h-[560px] w-[560px]">
              {/* Background Circle */}

              <div className="absolute inset-10 rounded-full bg-primary/5" />

              <div className="absolute inset-24 rounded-full border border-primary/10" />

              {/* Center Card */}

              <motion.div
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-1/2 top-1/2 z-20 w-64 -translate-x-1/2 -translate-y-1/2"
              >
                <Card className="border shadow-2xl">
                  <CardContent className="space-y-5 p-7">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
                      <Package className="h-8 w-8 text-white" />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold">
                        Shipment In Transit
                      </h3>

                      <p className="mt-2 text-sm text-muted-foreground">
                        Live parcel tracking with real-time shipment updates and
                        estimated delivery.
                      </p>
                    </div>

                    <div className="rounded-xl bg-muted p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Status
                        </span>

                        <span className="font-semibold text-primary">
                          In Transit
                        </span>
                      </div>

                      <div className="mt-3 h-2 rounded-full bg-background">
                        <motion.div
                          className="h-full rounded-full bg-primary"
                          initial={{
                            width: "0%",
                          }}
                          animate={{
                            width: "72%",
                          }}
                          transition={{
                            duration: 1.5,
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Fast Delivery */}

              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute left-0 top-16"
              >
                <Card className="w-52 shadow-lg">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="rounded-xl bg-primary/10 p-3">
                      <Truck className="h-6 w-6 text-primary" />
                    </div>

                    <div>
                      <h4 className="font-semibold">Fast Delivery</h4>

                      <p className="text-xs text-muted-foreground">
                        Nationwide Coverage
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Secure Shipping */}

              <motion.div
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 0.5,
                }}
                className="absolute right-0 top-28"
              >
                <Card className="w-56 shadow-lg">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="rounded-xl bg-green-100 p-3">
                      <ShieldCheck className="h-6 w-6 text-green-600" />
                    </div>

                    <div>
                      <h4 className="font-semibold">Secure Shipping</h4>

                      <p className="text-xs text-muted-foreground">
                        Safe & Protected Deliveries
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Live Tracking */}

              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1,
                }}
                className="absolute bottom-10 left-10"
              >
                <Card className="w-56 shadow-lg">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="rounded-xl bg-orange-100 p-3">
                      <MapPinned className="h-6 w-6 text-orange-600" />
                    </div>

                    <div>
                      <h4 className="font-semibold">Live Tracking</h4>

                      <p className="text-xs text-muted-foreground">
                        Real-time Shipment Updates
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              {/* Decorative Glow */}

              <div className="absolute left-20 top-20 h-20 w-20 rounded-full bg-primary/10 blur-3xl" />

              <div className="absolute bottom-20 right-20 h-28 w-28 rounded-full bg-orange-500/10 blur-3xl" />

              {/* Decorative Dots */}

              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                className="absolute right-16 top-10 h-4 w-4 rounded-full bg-primary"
              />

              <motion.div
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute left-12 bottom-24 h-3 w-3 rounded-full bg-orange-500"
              />

              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute right-40 bottom-8 h-5 w-5 rounded-full bg-primary/40"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
