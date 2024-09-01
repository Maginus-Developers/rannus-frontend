import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthCallback from "./pages/AuthCallback";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/callback",
    element: <AuthCallback />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
