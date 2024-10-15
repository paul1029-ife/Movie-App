import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import "./index.css";
import Favorites from "./pages/Favorites.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Popular from "./pages/Popular.tsx";

 const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <div>404 error, This page does not exist</div>
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "/popular",
    element: <Popular /> 
  }
  
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
