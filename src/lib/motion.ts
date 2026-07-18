export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const motionVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.04,
      },
    },
  },
} as const;

export const defaultTransition = {
  duration: 0.5,
  ease: easeOutExpo,
};

export const viewportOnce = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -6% 0px",
} as const;
