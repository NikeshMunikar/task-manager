import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import TasksPage from "../pages/TasksPage";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import RegisterPage from "../pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage/>,
  },
  {
    path: "/health",
    element: <h1>Hello from health</h1>,
    errorElement: <h1>Route failed</h1>,
  },
  {
    element:<ProtectedRoute/>,
    children:[
      {
       path: "/tasks",
       element:
        <TasksPage />
      },
    ],
   
  },

  {
    path: "*",
    element: <h1>404 Route Not Found</h1>,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
