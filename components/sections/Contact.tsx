"use client";

import Reveal from "@/components/shared/Reveal";
import SocialIcon from "@/components/shared/SocialIcon";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { FOOTER_LINKS } from "@/lib/data";
import { Mail, Phone, MapPin } from "lucide-react";

const SOCIAL_ICON: Record<string, "instagram" | "youtube" | "linkedin" | "x"> = {
  Instagram: "instagram",
  YouTube: "youtube",
  LinkedIn: "linkedin",
  X: "x",
};

/**
 * Contact — form + contact panel + socials on the LEFT (inner ~64%), the
 * persistent phone (Book Consultation) on the RIGHT via the global pose.
 */
export default function Contact() {
  const { email, phone, address } = FOOTER_LINKS.contact;

  return (
    <section
      id="contact"
      className="relative z-10 flex min-h-[100svh] items-center px-6 py-28 lg:h-screen lg:items-start lg:overflow-hidden lg:py-0 lg:pt-[11vh]"
    >
      <div className="mx-auto w-full max-w-[1440px] lg:pr-[34%]">
        <Reveal as="p" className="text-xs font-semibold tracking-[0.35em] text-primary uppercase">
          Contact Us
        </Reveal>
        <Reveal as="h2" delay={0.08} mobileReveal="left" className="headline mt-3 text-4xl md:text-5xl lg:text-[3.2rem]">
          <span className="text-gradient-silver">Get in</span>{" "}
          <span className="text-gradient-orange">Touch.</span>
        </Reveal>
        <Reveal as="p" delay={0.15} mobileReveal="right" className="mt-3 max-w-lg text-sm text-silver-dim md:text-base">
          We&apos;d love to hear from you. Fill the form and our team will get
          back to you soon.
        </Reveal>

        <Reveal delay={0.22} mobileReveal="left" className="mt-6">
          <ConsultationForm />
        </Reveal>

        {/* Unified contact info panel — directly under the form */}
        <Reveal delay={0.3} margin="0px" mobileReveal="right" className="glass mt-4 rounded-2xl border border-white/10 p-5">
          <div className="grid gap-5 sm:grid-cols-3 sm:divide-x sm:divide-white/10">
            <div className="flex items-start gap-3 sm:pr-4">
              <span className="glass flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-primary/30 text-primary">
                <Mail size={16} />
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white">Email</div>
                <a
                  href={`mailto:${email}`}
                  className="mt-0.5 block truncate text-xs text-silver-dim transition-colors hover:text-primary"
                >
                  {email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:px-4">
              <span className="glass flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-primary/30 text-primary">
                <Phone size={16} />
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white">Call Now</div>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="mt-0.5 block text-xs text-silver-dim transition-colors hover:text-primary"
                >
                  {phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:pl-4">
              <span className="glass flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-primary/30 text-primary">
                <MapPin size={16} />
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white">Location</div>
                <p className="mt-0.5 text-xs leading-relaxed text-silver-dim">
                  {address}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Social links — directly under the contact panel */}
        <Reveal delay={0.36} margin="0px" mobileReveal="left" className="mt-4 flex gap-3">
          {FOOTER_LINKS.social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="glass flex h-10 w-10 items-center justify-center rounded-full text-silver transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_16px_rgba(255,106,0,0.3)]"
            >
              <SocialIcon name={SOCIAL_ICON[s.label] ?? "x"} />
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
