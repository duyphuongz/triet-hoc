import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { AnimatedLayout } from "./AnimatedLayout";

import { LoadingState } from "../shared/components/LoadingState";

const LandingPage = lazy(() => import("../pages/LandingPage").then((module) => ({ default: module.LandingPage })));
const QuizIntroPage = lazy(() => import("../pages/QuizIntroPage").then((module) => ({ default: module.QuizIntroPage })));
const QuizPage = lazy(() => import("../pages/QuizPage").then((module) => ({ default: module.QuizPage })));
const ResultPage = lazy(() => import("../pages/ResultPage").then((module) => ({ default: module.ResultPage })));
const HistoryPage = lazy(() => import("../pages/HistoryPage").then((module) => ({ default: module.HistoryPage })));
const AboutPage = lazy(() => import("../pages/AboutPage").then((module) => ({ default: module.AboutPage })));
const AdminLoginPage = lazy(() => import("../pages/admin/AdminLoginPage").then((module) => ({ default: module.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import("../pages/admin/AdminDashboardPage").then((module) => ({ default: module.AdminDashboardPage })));
const AdminQuestionsPage = lazy(() => import("../pages/admin/AdminQuestionsPage").then((module) => ({ default: module.AdminQuestionsPage })));
const AdminPhilosophiesPage = lazy(() => import("../pages/admin/AdminPhilosophiesPage").then((module) => ({ default: module.AdminPhilosophiesPage })));

function page(element: JSX.Element) {
  return <Suspense fallback={<LoadingState label="Đang tải màn hình..." />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AnimatedLayout />,
    children: [
      { index: true, element: page(<LandingPage />) },
      { path: "quiz/:courseCode/intro", element: page(<QuizIntroPage />) },
      { path: "quiz/:courseCode", element: page(<QuizPage />) },
      { path: "results/:shareSlug", element: page(<ResultPage />) },
      { path: "history", element: page(<HistoryPage />) },
      { path: "about", element: page(<AboutPage />) },
      { path: "admin/login", element: page(<AdminLoginPage />) },
      { path: "admin", element: page(<AdminDashboardPage />) },
      { path: "admin/questions", element: page(<AdminQuestionsPage />) },
      { path: "admin/philosophies", element: page(<AdminPhilosophiesPage />) },
      { path: "*", element: <Navigate to="/" replace /> },
    ]
  }
]);
