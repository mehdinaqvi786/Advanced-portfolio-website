"use client";

import { motion } from "framer-motion";

import { ContactInfoCard } from "@/components/sections/contact/contact-info-card";
import { CONTACT_CONTENT, CONTACT_INFO_CARDS } from "@/data/contact";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { defaultTransition, motionVariants } from "@/lib/motion";

export function ContactInfo() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      variants={motionVariants.staggerContainer}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-8"
    >
      <div>
        <motion.p
          variants={motionVariants.fadeUp}
          transition={defaultTransition}
          className="mb-3 text-sm font-medium tracking-[0.16em] text-primary uppercase"
        >
          {CONTACT_CONTENT.eyebrow}
        </motion.p>
        <motion.h2
          id="contact-heading"
          variants={motionVariants.fadeUp}
          transition={defaultTransition}
          className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
        >
          {CONTACT_CONTENT.heading}
        </motion.h2>
        <motion.p
          variants={motionVariants.fadeUp}
          transition={defaultTransition}
          className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {CONTACT_CONTENT.description}
        </motion.p>
      </div>

      <motion.ul
        variants={motionVariants.staggerContainer}
        className="grid gap-3"
        aria-label="Contact information"
      >
        {CONTACT_INFO_CARDS.map((item) => (
          <ContactInfoCard key={item.id} item={item} />
        ))}
      </motion.ul>
    </motion.div>
  );
}
