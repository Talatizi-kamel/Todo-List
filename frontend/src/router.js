import { lazy } from "react";
import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import { rootLoader } from "./api/loader";
const Homepage = lazy(() => import("./components/Homepage"));
const Signup = lazy(() => import("./components/signup"));
const Login = lazy(() => import("./components/Login"));
const Profile = lazy(() => import("./components/Profile"));
const Content = lazy(() => import("./components/content"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: rootLoader,
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
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "Todolists",
        element: <Content />,
      },
    ],
  },
]);
