import {
  Zap,
  Truck,
  Globe,
  ShieldCheck,
  Building2,
  CreditCard,
  Boxes,
  Headphones,
  Package,
  MapPinned,
  CheckCircle2,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   Services                                 */
/* -------------------------------------------------------------------------- */

export const services = [
  {
    id: 1,
    icon: Zap,
    title: "Express Delivery",
    description:
      "Fast and time-sensitive parcel delivery across India with real-time shipment tracking.",
  },
  {
    id: 2,
    icon: Truck,
    title: "Standard Delivery",
    description:
      "Reliable and cost-effective shipping solution for everyday deliveries.",
  },
  {
    id: 3,
    icon: Globe,
    title: "International Shipping",
    description:
      "Ship packages worldwide through our trusted logistics network.",
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: "Secure Delivery",
    description:
      "Every shipment is monitored and handled with complete security.",
  },
];

/* -------------------------------------------------------------------------- */
/*                              Why CargoPilot                                */
/* -------------------------------------------------------------------------- */

export const features = [
  {
    id: 1,
    icon: ShieldCheck,
    title: "Secure Shipping",
    description:
      "Every shipment is monitored with secure handling from pickup to delivery.",
  },
  {
    id: 2,
    icon: Truck,
    title: "Real-Time Tracking",
    description: "Track shipments with live updates and delivery milestones.",
  },
  {
    id: 3,
    icon: Building2,
    title: "Business Solutions",
    description:
      "Flexible logistics solutions designed for startups and enterprises.",
  },
  {
    id: 4,
    icon: Globe,
    title: "Nationwide Network",
    description:
      "Reliable shipping coverage across major cities throughout India.",
  },
];

/* -------------------------------------------------------------------------- */
/*                           Business Solutions                               */
/* -------------------------------------------------------------------------- */

export const businessSolutions = [
  {
    id: 1,
    icon: Building2,
    title: "Enterprise Logistics",
    description:
      "Scalable logistics solutions designed for growing businesses.",
  },
  {
    id: 2,
    icon: Boxes,
    title: "Bulk Shipments",
    description: "Ship hundreds of parcels efficiently with dedicated support.",
  },
  {
    id: 3,
    icon: CreditCard,
    title: "Custom Pricing",
    description:
      "Flexible pricing plans tailored for businesses of every size.",
  },
  {
    id: 4,
    icon: Headphones,
    title: "Dedicated Support",
    description: "Priority customer support with a dedicated logistics team.",
  },
];

/* -------------------------------------------------------------------------- */
/*                               How It Works                                 */
/* -------------------------------------------------------------------------- */

export const steps = [
  {
    id: 1,
    number: "01",
    icon: Package,
    title: "Book Shipment",
    description: "Create your shipment online in just a few clicks.",
  },
  {
    id: 2,
    number: "02",
    icon: Truck,
    title: "Pickup & Transit",
    description:
      "Our courier partner securely collects and transports your parcel.",
  },
  {
    id: 3,
    number: "03",
    icon: MapPinned,
    title: "Live Tracking",
    description: "Track every shipment milestone with real-time updates.",
  },
  {
    id: 4,
    number: "04",
    icon: CheckCircle2,
    title: "Delivered",
    description:
      "Receive delivery confirmation once your parcel reaches its destination.",
  },
];

/* -------------------------------------------------------------------------- */
/*                                     FAQ                                    */
/* -------------------------------------------------------------------------- */

export const faqs = [
  {
    id: 1,
    question: "How can I track my shipment?",
    answer:
      "Use your shipment tracking ID on the Track Parcel page to view the latest delivery status.",
  },
  {
    id: 2,
    question: "Do you provide business shipping solutions?",
    answer:
      "Yes. CargoPilot offers scalable logistics solutions for startups, SMEs and enterprises.",
  },
  {
    id: 3,
    question: "Can I ship internationally?",
    answer:
      "Yes. International shipping is available through our trusted logistics partners.",
  },
  {
    id: 4,
    question: "How long does delivery take?",
    answer:
      "Delivery time depends on the destination, shipping service and delivery location.",
  },
];

/* -------------------------------------------------------------------------- */
/*                                Highlights                                  */
/* -------------------------------------------------------------------------- */

export const highlights = [
  {
    id: 1,
    title: "Real-Time",
    description: "Shipment tracking with instant status updates.",
    variant: "primary",
  },
  {
    id: 2,
    title: "Secure",
    description: "Safe handling and reliable parcel transportation.",
    variant: "accent",
  },
  {
    id: 3,
    title: "Business",
    description: "Flexible logistics solutions for growing businesses.",
    variant: "muted",
  },
  {
    id: 4,
    title: "Nationwide",
    description: "Reliable delivery network across India.",
    variant: "muted",
  },
];
