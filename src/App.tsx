import { createBrowserRouter, RouterProvider } from "react-router"
import Login from "./components/Login"
import ForgotPassword from "./components/ForgotPassword"
import Register from "./components/Register"
import Dashboard from "./components/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/forget-password",
    element: <ForgotPassword />
  },
  {
    path: "/dashboard",
    element:
      <ProtectedRoute >
        <Dashboard />
      </ProtectedRoute >
  },
])

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}