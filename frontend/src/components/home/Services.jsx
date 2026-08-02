import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { services } from "./data";

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

const Services = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div {...fadeUp} className="mx-auto mb-16 max-w-2xl text-center">
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Our Services
          </span>

          <h2 className="mt-6 text-3xl font-bold md:text-5xl">
            Logistics Solutions
            <br />
            Designed for Everyone
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Whether you're sending a single parcel or managing thousands of
            business shipments, CargoPilot provides reliable, secure and
            scalable logistics solutions.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
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
                <CardContent className="flex h-full flex-col p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary">
                    <service.icon className="h-7 w-7 text-primary transition-colors group-hover:text-white" />
                  </div>

                  <h3 className="text-xl font-semibold">{service.title}</h3>

                  <p className="mt-4 flex-1 leading-7 text-muted-foreground">
                    {service.description}
                  </p>
                  <Link
                    to={service.href}
                    className="mt-8 inline-flex items-center gap-2 font-medium text-primary transition-colors hover:gap-3"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Business CTA */}

        <motion.div
          {...fadeUp}
          className="mt-20 overflow-hidden rounded-3xl border bg-muted/30"
        >
          <div className="flex flex-col items-center justify-between gap-8 p-10 text-center lg:flex-row lg:text-left">
            <div>
              <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                Business Logistics
              </span>

              <h3 className="mt-5 text-3xl font-bold">
                Need a Custom Shipping Solution?
              </h3>

              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                CargoPilot provides customized logistics solutions for startups,
                SMEs and enterprise businesses. Whether you ship hundreds or
                thousands of parcels every month, our platform scales with your
                business.
              </p>
            </div>

            <Button asChild size="lg" className="shrink-0">
              <Link to="/contact">
                Contact Sales
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
