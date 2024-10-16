import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import "./index.css";
import Favorites from "./pages/Favorites.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchProvider } from "./context/SearchContext.tsx";
import { FavoritesProvider } from "./context/FavoritesContext.tsx";
import PopularMovies from "./pages/Popular.tsx";
import Header from "./components/Header.tsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    errorElement: <div>404 error, This page does not exist</div>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/popular",
        element: <PopularMovies />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SearchProvider>
      <FavoritesProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </FavoritesProvider>
    </SearchProvider>
  </StrictMode>
);
