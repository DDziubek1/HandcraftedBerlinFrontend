import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout/MainLayout";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import { AuthProvider } from "./components/AuthProvider";
import AboutMe from "./pages/AboutMe";
import UserListings from "./pages/UserListings";
import Listing from "./components/Listing";
import ListingDetails from "./components/ListingDetails";
import Shop from "./pages/Shop";
import ListingShopDetails from "./components/ListingShopDetails";
import Cart from "./pages/Cart";
import Artists from "./pages/Artists";
export default function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
        <Route path="profile/about" element={<AboutMe />} />
        <Route path="profile/listings" element={<UserListings />} />
        <Route path="profile/listings/new" element={<Listing/>} />
        <Route path="profile/listings/:id" element={<ListingDetails/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/shop/:id" element={<ListingShopDetails/>} />
        <Route path="cart" element={<Cart/>} />
        <Route path="/artists" element={<Artists/>} />
        <Route path="*" element={<div>Not Found</div>} />


        </Route>
    )
  );



  return (
    
   <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  
  )
}