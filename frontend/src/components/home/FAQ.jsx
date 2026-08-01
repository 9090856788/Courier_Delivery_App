import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { faqs } from "./data";

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

const FAQ = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-4xl px-4 lg:px-6">

        <motion.div
          {...fadeUp}
          className="mb-16 text-center"
        >
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            FAQ
          </span>

          <h2 className="mt-6 text-3xl font-bold md:text-5xl">
            Frequently Asked
            <br />
            Questions
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Everything you need to know about CargoPilot's shipping,
            tracking and business logistics solutions.
          </p>
        </motion.div>

        <motion.div {...fadeUp}>
          <Accordion
            type="single"
            collapsible
            className="space-y-4"
          >
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={`item-${faq.id}`}
                className="rounded-2xl border px-6"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="pb-5 leading-7 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

      </div>
    </section>
  );
};

export default FAQ;