import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { businessSolutions, businessBenefits } from "./data";

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

const benefits = [
  "Enterprise-ready logistics platform",
  "Dedicated account management",
  "Real-time shipment visibility",
  "Scalable for growing businesses",
];

const BusinessSolutions = () => {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left */}

          <motion.div {...fadeUp}>
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Business Solutions
            </span>

            <h2 className="mt-6 text-3xl font-bold md:text-5xl">
              Logistics Built
              <br />
              for Modern Businesses
            </h2>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Whether you're an e-commerce brand, retailer or enterprise,
              CargoPilot helps simplify logistics with secure deliveries,
              transparent tracking and scalable shipping solutions.
            </p>

            <div className="mt-8 space-y-4">
              {benefits.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />

                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Button asChild size="lg" className="mt-10">
              <Link to="/contact">
                Contact Sales
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Right */}

          <motion.div {...fadeUp} className="grid gap-5 sm:grid-cols-2">
            {businessSolutions.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.id}
                  className="group border transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
                >
                  <CardContent className="p-7">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary">
                      <Icon className="h-7 w-7 text-primary transition-colors group-hover:text-white" />
                    </div>

                    <h3 className="text-xl font-semibold">{item.title}</h3>

                    <p className="mt-3 leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSolutions;
