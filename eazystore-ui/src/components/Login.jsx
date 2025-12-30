import React,{useEffect} from "react";
import PageTitle from "./PageTitle";
import { Link,Form,useActionData,useNavigation,useNavigate} from "react-router-dom";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth-context";
export default function Login() {
  const actionData=useActionData();
  const navigation=useNavigation();
  const isSubmitting=navigation.state==="submitting";
  const navigate =useNavigate();
  const {loginSuccess}=useAuth();
  const from=sessionStorage.getItem("redirectPath")||"/home";
  useEffect(() => {
  if (actionData?.success) {
    loginSuccess(actionData.jwtToken,actionData.user);
    sessionStorage.removeItem("redirectPath");
    setTimeout(()=>{navigate(from);},100);
    
  } else if (actionData?.errors) {
    toast.error(actionData.errors.message || "Login failed.");
  }
}, [actionData, navigate]);

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-lg rounded w-100" style={{ maxWidth: "450px" }}>
        <div className="card-body p-4">
          {/* Title */}
          <PageTitle title="Login" />

          {/* Form */}
          <Form method="POST">
            {/* Username Field */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-semibold text-primary">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Your Username"
                autoComplete="username"
                required
                className="form-control"
              />
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold text-primary">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Your Password"
                autoComplete="current-password"
                required
                minLength={8}
                maxLength={20}
                className="form-control"
              />
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <button type="submit"
              disabled={isSubmitting}
               className="btn btn-primary btn-lg">
                {isSubmitting?"Authenticating..":"Login"}
              </button>
            </div>
          </Form>

          {/* Register Link */}
          <p className="text-center text-muted mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-decoration-none text-primary fw-semibold">
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export async function loginAction({request}){
  const data=await request.formData();
  const loginData={username:data.get("username"),
    password:data.get("password"),
  };
  try {
    const response = await apiClient.post("/auth/login", loginData);
    const { message, user, jwtToken } = response.data;
    return { success: true, message, user, jwtToken };
  } catch (error) {
    if (error.response?.status === 401) {
      return {
        success: false,
        errors: { message: "Invalid username or password" },
      };
    }
    throw new Response(
      error.response?.data?.message ||
        error.message ||
        "Failed to login. Please try again.",
      { status: error.response?.status || 500 }
    );
  }
  
}