import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import ErrorPage from "./pages/404";
import AdminPanel from "./pages/AdminPanel";
import AdminUtilisateur from "./pages/AdminUtilisateur";
import AdminBorne from "./pages/AdminBorne";
import Reservation from "./pages/Reservation";
import AdminAddBornes from "./pages/AdminAddBornes";
import Map from "./pages/Map";
import Filtre from "./pages/Filtre";
import Profil from "./pages/Profil";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/admin",
        element: <AdminPanel />,
      },
      {
        path: "/liste-utilisateurs",
        element: <AdminUtilisateur />,
      },
      {
        path: "/liste-bornes",
        element: <AdminBorne />,
      },
      {
        path: "/profil",
        element: <Profil />,
      },
      {
        path: "/reservations",
        element: <Reservation />,
      },
      {
        path: "/ajout-bornes",
        element: <AdminAddBornes />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: "/map",
        element: <Map />,
      },
      {
        path: "/filter",
        element: <Filtre />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
