import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { getAdminEmail, getAdminToken } from "../../features/admin/api/adminApi";
import { useAuthStore } from "../../features/auth/stores/authStore";
import { ThemeToggle } from "./ThemeToggle";

const MotionLink = motion(Link);

const navLinkClassName =
  "rounded-lg px-3 py-2 text-ink transition-colors hover:bg-white dark:text-white dark:hover:bg-ink/20";

export function SiteHeader() {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const isAdminSession =
    location.pathname.startsWith("/admin") && Boolean(getAdminToken());
  const adminEmail = isAdminSession ? getAdminEmail() : null;

  return (
    <header className="transition-colors">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <MotionLink
          whileTap={{ scale: 0.95 }}
          to="/"
          className="text-lg font-black tracking-normal text-ink dark:text-white"
        >
          TriếtHọclàgì?
        </MotionLink>

        <nav aria-label="Điều hướng chính" className="flex items-center gap-2 text-sm font-semibold">
          <ThemeToggle />
          {isAdminSession ? (
            <div
              className="flex items-center gap-2 rounded-lg border border-ink/10 bg-white/80 px-2 py-1.5 text-left shadow-sm dark:border-white/10 dark:bg-slate-800/80"
              title={adminEmail || "Tài khoản quản trị"}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-grape/10 text-grape dark:bg-grape/20 dark:text-violet-300">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="hidden min-w-0 sm:block">
                <span className="block text-[10px] font-black uppercase leading-none tracking-[0.14em] text-ink/40 dark:text-white/40">
                  Admin
                </span>
                <span className="mt-1 block max-w-48 truncate text-xs font-bold leading-none text-ink dark:text-white">
                  {adminEmail || "Quản trị viên"}
                </span>
              </span>
              <span className="sr-only">Đang đăng nhập bằng tài khoản Admin</span>
            </div>
          ) : isAuthenticated ? (
            <>
              <MotionLink
                whileTap={{ scale: 0.95 }}
                className={navLinkClassName}
                to="/user/history"
              >
                Lịch sử ({user?.name || "User"})
              </MotionLink>
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className={navLinkClassName}
              >
                Đăng xuất
              </motion.button>
            </>
          ) : (
            <>
              <MotionLink
                whileTap={{ scale: 0.95 }}
                className={`${navLinkClassName} hidden sm:inline-block`}
                to="/history"
              >
                Lịch sử ẩn danh
              </MotionLink>
              <MotionLink
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-teal px-4 py-2 text-white transition-colors hover:bg-teal-600"
                to="/login"
              >
                Đăng nhập
              </MotionLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
