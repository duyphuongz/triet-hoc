import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useThemeStore } from "../stores/themeStore";
import { Button } from "./Button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      className="relative !p-2 h-10 w-10 rounded-full hover:bg-ink/5 dark:hover:bg-white/10 overflow-hidden"
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          y: isDark ? 0 : -40,
          opacity: isDark ? 1 : 0,
          rotate: isDark ? 0 : 90,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <Sun className="h-5 w-5 text-orange-500" aria-hidden="true" />
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          y: isDark ? 40 : 0,
          opacity: isDark ? 0 : 1,
          rotate: isDark ? -90 : 0,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <Moon className="h-5 w-5 text-indigo-500 fill-indigo-500/30" aria-hidden="true" />
      </motion.div>
    </Button>
  );
}
