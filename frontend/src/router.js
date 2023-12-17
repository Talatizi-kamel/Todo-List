import { lazy } from "react";
import App from "./App";
import { createBrowserRouter } from "react-router-dom";
const Homepage = lazy(() => import("./components/Homepage"));
const Signup = lazy(() => import("./components/signup"));
const Login = lazy(() => import("./components/Login"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
