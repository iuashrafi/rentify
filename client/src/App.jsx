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
import ListingsPage from "./pages/property/ListingsPage";
import PropertyPage from "./pages/property/PropertyPage";
import SearchPage from "./pages/search/SearchPage";
import Error404Page from "./pages/Error404Page";

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
            {/* Edit Property - for editing a listing */}
            <Route
              path="/edit-property/:property_id"
              element={<AddPropertyPage />}
            />

            {/* My Listings page - for displaying properties added by current user*/}
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/listings/:property_id" element={<PropertyPage />} />

            {/* Search page */}
            <Route path="/search" element={<SearchPage />} />
            {/* note: using the Property page as in Listings */}
            <Route path="/search/:property_id" element={<PropertyPage />} />

            <Route path="*" element={<Error404Page />} />
            {/* end routes */}
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
