import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocation, useOutlet } from "react-router-dom";

export function AnimatedLayout() {
  const location = useLocation();
  const element = useOutlet();
  const prefersReducedMotion = useReducedMotion();
  const isAdminRoute =
    location.pathname.startsWith("/admin") && location.pathname !== "/admin/login";

  const initial = prefersReducedMotion
    ? { opacity: 1 }
    : isAdminRoute
      ? { opacity: 0, y: 14 }
      : { opacity: 0, scale: 0.98, filter: "blur(8px)" };
  const animate = prefersReducedMotion
    ? { opacity: 1 }
    : isAdminRoute
      ? { opacity: 1, y: 0 }
      : { opacity: 1, scale: 1, filter: "blur(0px)" };
  const exit = prefersReducedMotion
    ? { opacity: 1 }
    : isAdminRoute
      ? { opacity: 0, y: -8 }
      : { opacity: 0, scale: 0.98, filter: "blur(8px)" };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : isAdminRoute
              ? { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
              : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
        }
        className="flex min-h-screen flex-col"
      >
        {element}
      </motion.div>
    </AnimatePresence>
  );
}
