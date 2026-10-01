import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator, PackageSearch, PhoneCall } from "lucide-react";

import { Button } from "@/components/ui/button";

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

const CTA = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          {...fadeUp}
          className="overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground shadow-xl md:px-16"
        >
          <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
            Ready to Get Started?
          </span>

          <h2 className="mt-6 text-3xl font-bold md:text-5xl">
            Ship Smarter with CargoPilot
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/80">
            Whether you're sending one parcel or managing thousands of business
            shipments, CargoPilot gives you the tools to ship faster, track
            smarter and grow confidently.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              <Link to="/track">
                <PackageSearch className="mr-2 h-5 w-5" />
                Track Shipment
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-white/30 bg-transparent text-white hover:bg-white hover:text-primary sm:w-auto"
            >
              <Link to="/calculate">
                <Calculator className="mr-2 h-5 w-5" />
                Calculate Cost
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="ghost"
              className="w-full text-white hover:bg-white/10 sm:w-auto"
            >
              <Link to="/contact">
                <PhoneCall className="mr-2 h-5 w-5" />
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

export default CTA;