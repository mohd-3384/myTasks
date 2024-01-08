import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "./context/ThemeContext.jsx";
// components
import Home from "./pages/home/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Signup from './pages/Signup.jsx'
import Signin from './pages/sign-in/Signin.jsx'
import Error404 from './pages/Error404.jsx'
import EditTask from "./pages/edit-task/EditTask.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404 />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/edit-task/:stringID",
    element: <EditTask />,
  },
]);

function App() {

  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${theme}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
