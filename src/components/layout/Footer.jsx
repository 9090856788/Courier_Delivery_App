import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Company */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/logo.png"
                alt="CargoPilot"
                className="h-11 w-11 object-contain"
              />

              <div>
                <h2 className="text-xl font-bold text-white">
                  Cargo<span className="text-orange-500">Pilot</span>
                </h2>

                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Delivering with Precision
                </p>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-7 text-slate-400">
              CargoPilot helps businesses and individuals ship parcels securely
              across India with fast delivery, real-time tracking and reliable
              logistics solutions.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="rounded-lg border border-slate-800 p-2 transition hover:border-orange-500 hover:text-orange-500"
              >
                <Facebook size={18} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="rounded-lg border border-slate-800 p-2 transition hover:border-orange-500 hover:text-orange-500"
              >
                <Instagram size={18} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="rounded-lg border border-slate-800 p-2 transition hover:border-orange-500 hover:text-orange-500"
              >
                <Linkedin size={18} />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="rounded-lg border border-slate-800 p-2 transition hover:border-orange-500 hover:text-orange-500"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link to="/" className="transition hover:text-orange-500">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/track" className="transition hover:text-orange-500">
                  Track Parcel
                </Link>
              </li>

              <li>
                <Link
                  to="/calculate"
                  className="transition hover:text-orange-500"
                >
                  Calculate Cost
                </Link>
              </li>

              <li>
                <Link to="/about" className="transition hover:text-orange-500">
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="transition hover:text-orange-500"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}

          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">Services</h3>

            <ul className="space-y-3">
              <li>Express Delivery</li>
              <li>Standard Delivery</li>
              <li>International Shipping</li>
              <li>Business Logistics</li>
              <li>Real-Time Tracking</li>
            </ul>
          </div>
          {/* Company */}

          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">Company</h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/privacy-policy"
                  className="transition hover:text-orange-500"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link to="/terms" className="transition hover:text-orange-500">
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link to="/faq" className="transition hover:text-orange-500">
                  FAQs
                </Link>
              </li>

              <li>
                <Link
                  to="/careers"
                  className="transition hover:text-orange-500"
                >
                  Careers
                </Link>
              </li>

              <li>
                <Link
                  to="/support"
                  className="transition hover:text-orange-500"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">Contact</h3>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 shrink-0 text-orange-500" />

                <p>
                  CargoPilot Technologies Pvt. Ltd.
                  <br />
                  Bengaluru, Karnataka
                  <br />
                  India
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-orange-500" />

                <a
                  href="tel:+9118001234567"
                  className="transition hover:text-orange-500"
                >
                  +91 1800 123 4567
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-orange-500" />

                <a
                  href="mailto:support@cargopilot.in"
                  className="transition hover:text-orange-500"
                >
                  support@cargopilot.in
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center text-sm text-slate-500 md:flex-row">
            <p>© {new Date().getFullYear()} CargoPilot. All rights reserved.</p>

            <p>Designed & Developed in India 🇮🇳</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
