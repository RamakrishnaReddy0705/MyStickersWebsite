import React, { useRef, useEffect } from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import PageTitle from "./PageTitle";

export default function Register() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const submit = useSubmit();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.success) {
      navigate("/login");
      toast.success("Registration completed successfully. Try login..");
    }
  }, [actionData, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    if (!validatePasswords(formData)) return;
    submit(formData, { method: "post" });
  };

  const validatePasswords = (formData) => {
    const password = formData.get("password");
    const confirmPwd = formData.get("confirmPwd");

    if (password !== confirmPwd) {
      toast.error("Passwords do not match!");
      return false;
    }
    return true;
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow w-100" style={{ maxWidth: "420px" }}>
        <div className="card-body p-4">
          <PageTitle title="Register" />

          <Form
            method="POST"
            ref={formRef}
            onSubmit={handleSubmit}
          >
            {/* Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                className="form-control"
                placeholder="Your Name"
                required
                minLength={5}
                maxLength={30}
              />
              {actionData?.errors?.name && (
                <div className="text-danger small mt-1">
                  {actionData.errors.name}
                </div>
              )}
            </div>

            {/* Email + Mobile */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Your Email"
                  required
                />
                {actionData?.errors?.email && (
                  <div className="text-danger small mt-1">
                    {actionData.errors.email}
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="mobileNumber" className="form-label fw-semibold">
                  Mobile Number
                </label>
                <input
                  id="mobileNumber"
                  type="tel"
                  name="mobileNumber"
                  className="form-control"
                  placeholder="Your Mobile Number"
                  pattern="^\d{10}$"
                  title="Mobile number must be exactly 10 digits"
                  required
                />
                {actionData?.errors?.mobileNumber && (
                  <div className="text-danger small mt-1">
                    {actionData.errors.mobileNumber}
                  </div>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className="form-control"
                placeholder="Your Password"
                minLength={8}
                maxLength={20}
                required
              />
              {actionData?.errors?.password && (
                <div className="text-danger small mt-1">
                  {actionData.errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label htmlFor="confirmPwd" className="form-label fw-semibold">
                Confirm Password
              </label>
              <input
                id="confirmPwd"
                type="password"
                name="confirmPwd"
                className="form-control"
                placeholder="Confirm Your Password"
                minLength={8}
                maxLength={20}
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-100 fw-semibold"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>

          {/* Login link */}
          <p className="text-center text-muted mt-3 mb-0">
            Already have an account?{" "}
            <Link to="/login" className="fw-semibold text-decoration-none">
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export async function registerAction({ request }) {
  const data = await request.formData();
  const registerData = {
    name: data.get("name"),
    email: data.get("email"),
    mobileNumber: data.get("mobileNumber"),
    password: data.get("password"),
  };
  try {
    const response = await apiClient.post("/auth/register", registerData);
    return { success: true };
  } catch (error) {
    if (error.response?.status === 400) {
      return { success: false, errors: error.response?.data };
    }
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to submit your message. Please try again.",
      { status: error.status || 500 }
    );
  }
}
