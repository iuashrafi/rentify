import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "./config";
import { UserContextProvider } from "./UserContext";

// importing routes - layout and pages
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import AuthLayout from "./pages/auth/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AddPropertyPage from "./pages/add-property/AddPropertyPage";

axios.defaults.baseURL = BACKEND_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            {/* Auth pages - Login and registeration */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Profile page - displaying user's info */}
            <Route path="/profile" element={<ProfilePage />} />

            {/* Add Property page - for creating a listing */}
            <Route path="/add-property" element={<AddPropertyPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
