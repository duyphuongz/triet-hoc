import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white shadow-soft hover:-translate-y-0.5 hover:bg-black",
  secondary: "bg-lemon text-ink shadow-soft hover:-translate-y-0.5",
  ghost: "bg-white/80 text-ink ring-1 ring-ink/10 hover:bg-white",
  danger: "bg-coral text-white shadow-soft hover:-translate-y-0.5",
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

type ButtonLinkProps = LinkProps & {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export function ButtonLink({ className = "", variant = "primary", ...props }: ButtonLinkProps) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
