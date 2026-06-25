import type { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { motion, HTMLMotionProps } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white shadow-soft hover:-translate-y-0.5 hover:bg-black dark:bg-slate-100 dark:text-ink dark:hover:bg-white",
  secondary: "bg-lemon text-ink shadow-soft hover:-translate-y-0.5 dark:bg-yellow-600 dark:text-white",
  ghost: "bg-white/80 text-ink ring-1 ring-ink/10 hover:bg-white dark:bg-slate-800/80 dark:text-white dark:ring-white/10 dark:hover:bg-slate-700",
  danger: "bg-coral text-white shadow-soft hover:-translate-y-0.5 dark:bg-red-600 dark:text-white",
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: Variant;
};

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  return (
    <motion.button 
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className={`${base} ${variants[variant]} ${className}`} 
      {...props} 
    />
  );
}

type ButtonLinkProps = LinkProps & {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

// Create a motion version of react-router's Link
const MotionLink = motion(Link);

export function ButtonLink({ className = "", variant = "primary", ...props }: ButtonLinkProps) {
  return (
    <MotionLink 
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className={`${base} ${variants[variant]} ${className}`} 
      {...props as any} 
    />
  );
}
