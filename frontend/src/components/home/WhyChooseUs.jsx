import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";

import { features, highlights } from "./data";

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

const WhyChooseUs = () => {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div {...fadeUp} className="mx-auto mb-16 max-w-2xl text-center">
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Why CargoPilot
          </span>

          <h2 className="mt-6 text-3xl font-bold md:text-5xl">
            Built for Reliable
            <br />
            Modern Logistics
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            CargoPilot combines secure shipping, live parcel tracking and
            intelligent logistics management into one modern courier platform.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.1,
              }}
              whileHover={{
                y: -8,
              }}
            >
              <Card className="group h-full border transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
                <CardContent className="flex h-full flex-col items-center p-8 text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
                    <feature.icon className="h-8 w-8 text-primary transition-colors duration-300 group-hover:text-white" />
                  </div>

                  <h3 className="text-xl font-semibold">{feature.title}</h3>

                  <p className="mt-4 leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}

        <motion.div
          {...fadeUp}
          className="mt-20 rounded-3xl border bg-background shadow-sm"
        >
          <div className="grid gap-10 p-10 lg:grid-cols-2 lg:items-center">
            {/* Left */}

            <div>
              <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                Trusted Logistics Partner
              </span>

              <h3 className="mt-6 text-3xl font-bold">
                Simplifying Shipping
                <br />
                for Businesses & Individuals
              </h3>

              <p className="mt-5 leading-8 text-muted-foreground">
                CargoPilot is designed to simplify logistics with modern
                technology, transparent shipment tracking and dependable
                delivery services. Whether you're sending personal parcels or
                managing business shipments, our platform helps you stay
                informed every step of the way.
              </p>
            </div>

            {/* Right */}

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
                <h4 className="text-2xl font-bold">Real-Time</h4>

                <p className="mt-2 text-sm text-primary-foreground/80">
                  Shipment tracking with instant status updates.
                </p>
              </div>

              <div className="rounded-2xl bg-orange-500 p-6 text-white">
                <h4 className="text-2xl font-bold">Secure</h4>

                <p className="mt-2 text-sm text-white/80">
                  Safe handling and reliable parcel transportation.
                </p>
              </div>

              <div className="rounded-2xl border bg-muted/40 p-6">
                <h4 className="text-2xl font-bold">Business</h4>

                <p className="mt-2 text-sm text-muted-foreground">
                  Flexible logistics solutions for growing businesses.
                </p>
              </div>

              <div className="rounded-2xl border bg-muted/40 p-6">
                <h4 className="text-2xl font-bold">Nationwide</h4>

                <p className="mt-2 text-sm text-muted-foreground">
                  Reliable delivery network connecting major cities.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
