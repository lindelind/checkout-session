import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Start } from "./pages/Start";
import { WebShop } from "./pages/WebShop";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Start />,
        index: true,
      },
      {
        path: "/webshop",
        element: <WebShop />,
      },
    ],
  },
]);