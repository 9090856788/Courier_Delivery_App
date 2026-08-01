import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

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

const Contact = () => {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.subject.trim() ||
      !form.message.trim()
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive",
      });

      return;
    }

    try {
      setLoading(true);

      // await contactService.send(form);

      await new Promise((resolve) => setTimeout(resolve, 1200));

      toast({
        title: "Message Sent",
        description:
          "Thank you for contacting CargoPilot. We'll get back to you shortly.",
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-24">
      {/* Hero */}

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Contact Us
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
              Let's Talk Logistics
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Have questions about shipments, tracking or business logistics?
              Our team is always ready to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}

      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid gap-10 lg:grid-cols-3">
            <motion.div {...fadeUp} className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <h2 className="mb-8 text-2xl font-semibold">
                    Send Us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <Label>Full Name *</Label>

                        <Input
                          name="name"
                          placeholder="John Doe"
                          value={form.name}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <Label>Email Address *</Label>

                        <Input
                          type="email"
                          name="email"
                          placeholder="john@example.com"
                          value={form.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <Label>Phone Number</Label>

                        <Input
                          name="phone"
                          placeholder="+91 XXXXX XXXXX"
                          value={form.phone}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <Label>Subject *</Label>

                        <Input
                          name="subject"
                          placeholder="How can we help?"
                          value={form.subject}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Message *</Label>

                      <Textarea
                        rows={6}
                        name="message"
                        placeholder="Write your message..."
                        value={form.message}
                        onChange={handleChange}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="w-full"
                    >
                      {loading ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Inquiry
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
            {/* Contact Information */}

            <motion.div {...fadeUp} className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-6 text-2xl font-semibold">
                    Contact Information
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>

                      <div>
                        <h3 className="font-semibold">Office Address</h3>

                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          CargoPilot Technologies
                          <br />
                          Bengaluru, Karnataka
                          <br />
                          India
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>

                      <div>
                        <h3 className="font-semibold">Phone</h3>

                        <a
                          href="tel:+9118001234567"
                          className="mt-1 block text-sm text-muted-foreground transition hover:text-primary"
                        >
                          +91 1800 123 4567
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>

                      <div>
                        <h3 className="font-semibold">Email</h3>

                        <a
                          href="mailto:support@cargopilot.in"
                          className="mt-1 block text-sm text-muted-foreground transition hover:text-primary"
                        >
                          support@cargopilot.in
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>

                      <div>
                        <h3 className="font-semibold">Business Hours</h3>

                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          Monday – Friday
                          <br />
                          9:00 AM – 6:00 PM IST
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Google Map */}

              <Card>
                <CardContent className="p-0">
                  <iframe
                    title="CargoPilot Location"
                    src="https://www.google.com/maps?q=Bengaluru,Karnataka&output=embed"
                    className="h-72 w-full rounded-lg border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}

      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div {...fadeUp} className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>

              <p className="mt-4 text-muted-foreground">
                Answers to some common questions.
              </p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold">
                    How can I track my shipment?
                  </h3>

                  <p className="mt-3 text-muted-foreground">
                    Use the tracking number on the Track Parcel page to view
                    your shipment's latest status.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold">
                    Do you offer business shipping solutions?
                  </h3>

                  <p className="mt-3 text-muted-foreground">
                    Yes. CargoPilot provides logistics solutions for businesses
                    of all sizes with secure and reliable delivery services.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold">
                    How quickly will I receive a response?
                  </h3>

                  <p className="mt-3 text-muted-foreground">
                    Our support team usually responds within one business day.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
      {/* CTA */}

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            {...fadeUp}
            className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-primary"
          >
            <div className="px-8 py-14 text-center text-white md:px-16">
              <h2 className="text-3xl font-bold md:text-4xl">
                Ready to Ship with CargoPilot?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90">
                Whether you're sending a single package or managing business
                logistics, CargoPilot helps you ship faster, track smarter and
                deliver with confidence.
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
                  <Link to="/calculate">Calculate Shipping</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
