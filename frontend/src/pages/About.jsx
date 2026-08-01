import { motion } from "framer-motion";
import {
  Truck,
  Globe,
  ShieldCheck,
  Zap,
  HeartHandshake,
  Cpu,
  PackageCheck,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Zap,
    title: "Fast Delivery",
    desc: "Optimized logistics and intelligent routing ensure your shipments reach their destination quickly.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Service",
    desc: "Every shipment is handled with care, transparency, and secure tracking from pickup to delivery.",
  },
  {
    icon: Cpu,
    title: "Smart Technology",
    desc: "Modern tracking, automation and digital logistics simplify shipping for businesses and individuals.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    desc: "We focus on providing an exceptional customer experience through responsive support and reliable service.",
  },
];

const fadeUp = {
  initial: {
    opacity: 0,
    y: 30,
  },

  whileInView: {
    opacity: 1,
    y: 0,
  },

  viewport: {
    once: true,
  },

  transition: {
    duration: 0.5,
  },
};

const About = () => {
  return (
    <main className="pt-24">
      {/* Hero */}

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              About CargoPilot
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-foreground md:text-6xl">
              Delivering Smarter.
              <br />
              Connecting India Faster.
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              CargoPilot is a modern courier and logistics platform built to
              simplify parcel delivery with secure shipping, real-time tracking
              and technology-driven logistics solutions for businesses and
              individuals across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div {...fadeUp} className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold">Our Story</h2>

            <p className="mt-6 leading-8 text-muted-foreground">
              CargoPilot was created with one goal — to make shipping simple,
              transparent and dependable. Whether you're sending a personal
              package or managing business deliveries, our platform provides a
              seamless logistics experience powered by modern technology.
            </p>

            <p className="mt-5 leading-8 text-muted-foreground">
              From shipment booking and live parcel tracking to secure delivery
              management, CargoPilot combines innovation and operational
              excellence to build a logistics network that businesses and
              customers can rely on every day.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Mission & Vision */}

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div {...fadeUp}>
              <Card className="h-full border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <Truck className="h-7 w-7 text-primary" />
                  </div>

                  <h3 className="text-2xl font-semibold">Our Mission</h3>

                  <p className="mt-4 leading-8 text-muted-foreground">
                    To provide reliable, secure and technology-driven logistics
                    solutions that make parcel delivery simple for businesses
                    and individuals while maintaining the highest standards of
                    speed, transparency and customer satisfaction.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeUp}>
              <Card className="h-full border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10">
                    <Globe className="h-7 w-7 text-orange-500" />
                  </div>

                  <h3 className="text-2xl font-semibold">Our Vision</h3>

                  <p className="mt-4 leading-8 text-muted-foreground">
                    To become India's most trusted digital logistics platform by
                    combining innovation, intelligent automation and exceptional
                    customer experience into every shipment we deliver.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics */}

      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            <motion.div {...fadeUp}>
              <PackageCheck className="mx-auto mb-4 h-10 w-10" />

              <h3 className="text-4xl font-bold">10K+</h3>

              <p className="mt-2 text-white/80">Shipments Processed</p>
            </motion.div>

            <motion.div {...fadeUp}>
              <Truck className="mx-auto mb-4 h-10 w-10" />

              <h3 className="text-4xl font-bold">500+</h3>

              <p className="mt-2 text-white/80">Business Partners</p>
            </motion.div>

            <motion.div {...fadeUp}>
              <Globe className="mx-auto mb-4 h-10 w-10" />

              <h3 className="text-4xl font-bold">100+</h3>

              <p className="mt-2 text-white/80">Cities Covered</p>
            </motion.div>

            <motion.div {...fadeUp}>
              <ShieldCheck className="mx-auto mb-4 h-10 w-10" />

              <h3 className="text-4xl font-bold">99%</h3>

              <p className="mt-2 text-white/80">Customer Satisfaction</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Our Core Values</h2>

            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Everything we build and every shipment we deliver is guided by
              these principles.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                viewport={{
                  once: true,
                }}
              >
                <Card className="h-full border shadow-sm">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>

                    <h3 className="text-xl font-semibold">{value.title}</h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {value.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Why Choose CargoPilot */}

      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Why Choose CargoPilot?</h2>

            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Built with modern technology and customer satisfaction at its
              core, CargoPilot delivers a smarter logistics experience for
              individuals and businesses.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border shadow-sm">
              <CardContent className="p-6 text-center">
                <PackageCheck className="mx-auto mb-4 h-10 w-10 text-primary" />

                <h3 className="font-semibold">Real-Time Tracking</h3>

                <p className="mt-3 text-sm text-muted-foreground">
                  Monitor every shipment from pickup to delivery with live
                  tracking updates.
                </p>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardContent className="p-6 text-center">
                <Truck className="mx-auto mb-4 h-10 w-10 text-primary" />

                <h3 className="font-semibold">Fast Delivery</h3>

                <p className="mt-3 text-sm text-muted-foreground">
                  Optimized logistics ensure timely deliveries across India.
                </p>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardContent className="p-6 text-center">
                <ShieldCheck className="mx-auto mb-4 h-10 w-10 text-primary" />

                <h3 className="font-semibold">Secure Shipping</h3>

                <p className="mt-3 text-sm text-muted-foreground">
                  Every shipment is handled safely with complete transparency.
                </p>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardContent className="p-6 text-center">
                <Cpu className="mx-auto mb-4 h-10 w-10 text-primary" />

                <h3 className="font-semibold">Smart Technology</h3>

                <p className="mt-3 text-sm text-muted-foreground">
                  Automation and intelligent logistics simplify every delivery.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            {...fadeUp}
            className="mx-auto max-w-4xl rounded-3xl bg-primary px-8 py-16 text-center text-white"
          >
            <h2 className="text-4xl font-bold">Ready to Ship Smarter?</h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90">
              Whether you're sending one parcel or managing hundreds of
              shipments, CargoPilot provides a fast, secure and reliable
              logistics experience.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link to="/track">Track Parcel</Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white hover:text-primary"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;
