import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import AdminLayout from "./admin/AdminLayout"; // Admin Layout Component
import AdminDashboard from "./admin/Dashboard";
import Message from "./admin/pages/Message";
import AdminProjects from "./admin/pages/AdminProjects";
import Review from "./admin/pages/Review";
import Login from "./pages/Login";
import CreateProject from "./admin/pages/CreateProject";
import AdminLogin from "./admin/pages/AdminLogin";
import ProtectedRoute from "./PrivateRoute";
// Layout for public routes (with Navbar and Footer)
const PublicLayout = () => (
  <>
    <Navbar />
    <main className="flex-grow">
      <Outlet /> {/* Render nested routes */}
    </main>
    <Footer />
  </>
);

// Layout for admin routes
const AdminRoutesLayout = () => (
  <AdminLayout>
    <Outlet /> {/* Render nested admin routes */}
  </AdminLayout>
);

// Router Configuration
const router = createBrowserRouter([
  // Public Routes
  {
    element: <PublicLayout />, // Includes Navbar and Footer
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/projects", element: <Projects /> },
      { path: "/projects/:id", element: <ProjectDetail /> },
      { path: "/contact", element: <Contact /> },
    ],
  },

  // Admin Routes
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["admin"]}>
      <AdminRoutesLayout />
    </ProtectedRoute>, // Uses Admin Layout
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "messages", element: <Message /> },
      {
        path: "project",
        element: <AdminProjects />, 
        children: [
          { path: "create", element: <CreateProject /> }, 
        ],
      },
      { path: "reviews", element: <Review /> },
    ],
  },

  // Login Route (No Navbar or Footer)
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
