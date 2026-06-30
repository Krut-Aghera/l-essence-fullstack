import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
      createBrowserRouter,
      createRoutesFromElements,
      Route,
      RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { ProtectedRoutes, GuestOnlyRoutes } from "./components";
import UnauthorizedPage403 from "./pages/errors/UnauthorizedPage403.jsx";
import ServerErrorPage500 from "./pages/errors/ServerErrorPage500.jsx";
import NotFoundPage404 from "./pages/errors/NotFoundPage404.jsx";
import { setupInterceptors } from "./apis/interceptor.js";
import { Toaster } from "react-hot-toast";
import {
      AboutProject,
      CheckoutSummaryPage,
      BrandForm,
      BrandShowcase,
      Dashboard,
      Home,
      LoginPage,
      PerfumeForm,
      PerfumeGlossary,
      PerfumeInfoPage,
      PerfumeShowcase,
      SignupPage,
      TermsAndConditions,
      UpdatePerfumeForm,
      UserAccountPage,
      Wishlist,
      PaymentStatus,
      Orders,
      OrderDetail,
      CartPage,
      SourcingPolicies,
      PasswordResetEmail,
      ForgotPassword,
      ResetPassword,
} from "./pages";

// setupInterceptors(store)

const routerConfig = createBrowserRouter(
      createRoutesFromElements(
            <Route path="/" element={<App />}>
                  {/* Public Routes */}
                  <Route index element={<Home />} />
                  <Route path="brands" element={<BrandShowcase />} />
                  <Route path="perfumes" element={<PerfumeShowcase />} />
                  <Route path="perfume/:id" element={<PerfumeInfoPage />} />
                  <Route path="/perfumes/glossary" element={<PerfumeGlossary />} />
                  <Route path="/lessence/terms-conditions" element={<TermsAndConditions />} />
                  <Route path="/lessence/shipping-returns" element={<SourcingPolicies />} />
                  <Route path="/lessence/about" element={<AboutProject />} />

                  {/* Guest Only */}
                  <Route element={<GuestOnlyRoutes />}>
                        <Route path="auth/login" element={<LoginPage />} />
                        <Route path="auth/pass/forgot" element={<ForgotPassword />} />
                        <Route path="auth/pass/forgot/sent" element={<PasswordResetEmail />} />
                        <Route path="auth/pass/reset/:resetToken" element={<ResetPassword />} />

                        <Route path="auth/signup" element={<SignupPage />} />
                  </Route>

                  {/* Customer + Admin */}
                  <Route element={<ProtectedRoutes allowedRoles={["customer", "admin"]} />}>
                        <Route path="user/wishlist" element={<Wishlist />} />

                        <Route path="user/account" element={<UserAccountPage />} />

                        <Route path="user/cart" element={<CartPage />} />

                        <Route path="order/summary" element={<CheckoutSummaryPage />} />

                        <Route path="/payment-status" element={<PaymentStatus />} />

                        <Route path="user/orders" element={<Orders />} />

                        <Route path="user/orders/:id" element={<OrderDetail />} />
                  </Route>

                  {/* Admin Only */}
                  <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
                        <Route path="admin/dashboard" element={<Dashboard />} />

                        <Route path="admin/perfume" element={<PerfumeForm />} />

                        <Route path="admin/perfume/:id" element={<UpdatePerfumeForm />} />
                  </Route>

                  {/* Error / Warning  */}
                  <Route path="/unauthorized" element={<UnauthorizedPage403 />} />

                  <Route path="/server-error" element={<ServerErrorPage500 />} />

                  <Route path="*" element={<NotFoundPage404 />} />
            </Route>
      )
);

createRoot(document.getElementById("root")).render(
      <Provider store={store}>
            <Toaster
                  position="top-center"
                  reverseOrder={false}
                  gutter={8}
                  toastOptions={{
                        success: {
                              duration: 3000,
                        },
                        error: {
                              duration: 2000,
                        },
                        style: {
                              borderRadius: "16px",
                              background: "#fff",
                              color: "#111827",
                              border: "1px solid #e5e7eb",
                              padding: "14px 18px",
                        },
                  }}
            />

            <RouterProvider router={routerConfig} />
      </Provider>
);
