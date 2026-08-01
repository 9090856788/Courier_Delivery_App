import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { steps } from "./data";

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

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Heading */}

        <motion.div {...fadeUp} className="mx-auto mb-20 max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            How It Works
          </span>

          <h2 className="mt-6 text-3xl font-bold md:text-5xl">
            Ship Your Parcel
            <br />
            In Four Simple Steps
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            CargoPilot simplifies shipping with an easy booking process,
            real-time tracking and secure delivery from pickup to destination.
          </p>
        </motion.div>

        {/* Timeline */}

        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                whileHover={{
                  y: -6,
                }}
                className="relative"
              >
                {/* Desktop Connector */}

                {index !== steps.length - 1 && (
                  <div className="absolute left-[72%] top-10 hidden w-[58%] items-center xl:flex">
                    <div className="flex-1 border-t-2 border-dashed border-primary/20" />

                    <ArrowRight className="ml-2 h-4 w-4 text-primary/40" />
                  </div>
                )}

                <div className="flex flex-col items-center text-center">
                  {/* Icon Card */}

                  <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border bg-card shadow-sm transition-all duration-300 hover:shadow-xl">
                    <Icon className="h-10 w-10 text-primary" />

                    <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-md">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>

                  <p className="mt-3 leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}

        <motion.div
          {...fadeUp}
          className="mt-24 overflow-hidden rounded-3xl border bg-muted/30"
        >
          <div className="flex flex-col items-center justify-between gap-8 p-10 lg:flex-row">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                Ready to Ship?
              </span>

              <h3 className="mt-5 text-3xl font-bold">
                Create Your First Shipment Today
              </h3>

              <p className="mt-4 leading-7 text-muted-foreground">
                Whether you're sending a personal parcel or managing business
                deliveries, CargoPilot provides secure shipping, real-time
                tracking and dependable logistics for every shipment.
              </p>
            </div>

            <Button asChild size="lg" className="shrink-0">
              <Link to="/track">
                Track Shipment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
