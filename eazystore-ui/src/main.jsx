import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetail from "./components/ProductDetail.jsx";
import Login, { loginAction } from "./components/Login.jsx";
import Home, { productsLoader } from "./components/Home.jsx";
import About from "./components/About.jsx";
import Cart from "./components/Cart.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Contact, { contactAction } from "./components/Contact.jsx";
import { CartProvider } from "./store/cart-context.jsx";
import { AuthProvider } from "./store/auth-context.jsx";  // <-- IMPORT THIS
import CheckoutForm from "./components/CheckoutForm.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Profile, { profileLoader } from "./components/Profile.jsx";
import Orders from "./components/Orders.jsx";
import AdminOrders from "./components/admin/AdminOrders.jsx";
import Messages from "./components/admin/Messages.jsx";
import Register, { registerAction } from "./components/Register.jsx";

import { profileAction } from "./components/Profile.jsx";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js"
const stripePromise=loadStripe("pk_test_51Sj0JjFwwSo9EIxOLgZGcm4BXn2NnksADLI783Cr4w2IpeRr0SDKxmvj5Kd3Pou1TclsTov0OcvQHEei42FpggOE00bhFCOsTk");

const routerDefinations = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} loader={productsLoader} />
    <Route path="/home" element={<Home />} loader={productsLoader} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} action={contactAction} />
    <Route path="/login" element={<Login />} action={loginAction} />
    <Route path="/register" element={<Register />} action={registerAction} />
    <Route path="/cart" element={<Cart />} />
    
    <Route path="/products/:productId" element={<ProductDetail />} />
    <Route element={<ProtectedRoute />}>
         <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/profile" element={<Profile />} loader={profileLoader} action={profileAction}
        shouldRevalidate={({actionResult})=>{return !actionResult?.sucess}}/>
          <Route path="orders" element={<Orders/>} />
        <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/messages" element={<Messages/>} />
    </Route>
  </Route>
);

const appRouter = createBrowserRouter(routerDefinations);

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <Elements stripe={stripePromise}>
    <AuthProvider> 
      <CartProvider>
        <RouterProvider router={appRouter} />
      </CartProvider>
    </AuthProvider>

    <ToastContainer
      position="top-center"
      autoClose={3000}
      transition={Bounce}
    />
    </Elements>
  </StrictMode>
);
