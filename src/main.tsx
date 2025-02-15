import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";

import { AuthProvider } from "./context/auth-context";
const queryClient = new QueryClient();

// Pages

// Auth Pages
import SignIn from "./pages/sign-in/page";
import SignUp from "./pages/sign-up/page";
import Recover from "./pages/recover/page";
import ChooseAvatar from "./pages/choose-avatar/page";

// Dashboard Pages

// ProtectedRoutes
import ProtectedRoute from "./components/protected-route";

import Dashboard from "./pages/dashboard/page";
import FindTutors from "./pages/dashboard/find-tutors/page";
import MyRequests from "./pages/dashboard/my-requests/page";
import MyOffers from "./pages/dashboard/my-offers/page";
import Transactions from "./pages/dashboard/transactions/page";
import Profile from "./pages/dashboard/profile/page";
import Messages from "./pages/dashboard/messages/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/recover",
    element: <Recover />,
  },
  {
    path: "/choose-avatar",
    element: <ChooseAvatar />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "dashboard/find-tutors",
        element: <FindTutors />,
      },
      {
        path: "dashboard/my-requests",
        element: <MyRequests />,
      },
      {
        path: "dashboard/messages",
        element: <Messages />
      },
      {
        path: "dashboard/my-offers",
        element: <MyOffers />,
      },
      {
        path: "dashboard/transactions",
        element: <Transactions />,
      },
      {
        path: "dashboard/profile",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
