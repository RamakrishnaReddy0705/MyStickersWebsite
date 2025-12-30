import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import {
  Form,
  useLoaderData,
  useActionData,
  useNavigation,
  useNavigate,
  replace,
} from "react-router-dom";
import PageTitle from "./PageTitle";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth-context";

export default function Profile() {
  const initialProfileData = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const { logout } = useAuth();

  const [profileData, setProfileData] = useState(initialProfileData);

  useEffect(() => {
    if (actionData?.success) {
      if (actionData.profileData.emailUpdated) {
        sessionStorage.setItem("skipRedirectPath", "true");
        logout();
        toast.success("Logged out successfully! Login again with updated email");
        navigate("/login");
      } else {
        toast.success("Your Profile details are saved successfully!");
        setProfileData(actionData.profileData);
      }
    }
  }, [actionData]);

  // Bootstrap Class Mappings
  const labelStyle = "form-label fw-bold text-primary";
  const h2Style = "h4 fw-bold text-primary mb-4 mt-2";
  const textFieldStyle = "form-control";

  return (
    <div className="container py-5" style={{ minHeight: "852px" }}>
      <PageTitle title="My Profile" />

      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <Form method="PUT" className="needs-validation">
            
            <h2 className={h2Style}>Personal Details</h2>
            
            <div className="mb-4">
              <label htmlFor="name" className={labelStyle}>Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                className={`${textFieldStyle} ${actionData?.errors?.name ? 'is-invalid' : ''}`}
                value={profileData.name}
                onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                required
                minLength={5}
                maxLength={30}
              />
              {actionData?.errors?.name && (
                <div className="invalid-feedback d-block">{actionData.errors.name}</div>
              )}
            </div>

            <div className="row g-3 mb-4">
              <div className="col-sm-6">
                <label htmlFor="email" className={labelStyle}>Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={profileData.email}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                  className={`${textFieldStyle} ${actionData?.errors?.email ? 'is-invalid' : ''}`}
                  required
                />
                {actionData?.errors?.email && (
                  <div className="invalid-feedback d-block">{actionData.errors.email}</div>
                )}
              </div>

              <div className="col-sm-6">
                <label htmlFor="mobileNumber" className={labelStyle}>Mobile Number</label>
                <input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="tel"
                  required
                  pattern="^\d{10}$"
                  title="Mobile number must be exactly 10 digits"
                  value={profileData.mobileNumber}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, mobileNumber: e.target.value }))}
                  placeholder="Your Mobile Number"
                  className={`${textFieldStyle} ${actionData?.errors?.mobileNumber ? 'is-invalid' : ''}`}
                />
                {actionData?.errors?.mobileNumber && (
                  <div className="invalid-feedback d-block">{actionData.errors.mobileNumber}</div>
                )}
              </div>
            </div>

            <hr className="my-5" />
            <h2 className={h2Style}>Address Details</h2>

            <div className="mb-4">
              <label htmlFor="street" className={labelStyle}>Street</label>
              <input
                id="street"
                name="street"
                type="text"
                placeholder="Street details"
                value={profileData.street}
                onChange={(e) => setProfileData((prev) => ({ ...prev, street: e.target.value }))}
                className={`${textFieldStyle} ${actionData?.errors?.street ? 'is-invalid' : ''}`}
                required
                minLength={5}
                maxLength={30}
              />
              {actionData?.errors?.street && (
                <div className="invalid-feedback d-block">{actionData.errors.street}</div>
              )}
            </div>

            <div className="row g-3 mb-4">
              <div className="col-sm-6">
                <label htmlFor="city" className={labelStyle}>City</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Your City"
                  value={profileData.city}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, city: e.target.value }))}
                  className={`${textFieldStyle} ${actionData?.errors?.city ? 'is-invalid' : ''}`}
                  required
                />
                {actionData?.errors?.city && (
                  <div className="invalid-feedback d-block">{actionData.errors.city}</div>
                )}
              </div>

              <div className="col-sm-6">
                <label htmlFor="state" className={labelStyle}>State</label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  required
                  placeholder="Your State"
                  value={profileData.state}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, state: e.target.value }))}
                  className={`${textFieldStyle} ${actionData?.errors?.state ? 'is-invalid' : ''}`}
                />
                {actionData?.errors?.state && (
                  <div className="invalid-feedback d-block">{actionData.errors.state}</div>
                )}
              </div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-sm-6">
                <label htmlFor="postalCode" className={labelStyle}>Postal Code</label>
                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  placeholder="Your Postal Code"
                  value={profileData.postalCode}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, postalCode: e.target.value }))}
                  className={`${textFieldStyle} ${actionData?.errors?.postalCode ? 'is-invalid' : ''}`}
                  required
                  pattern="^\d{5}$"
                />
                {actionData?.errors?.postalCode && (
                  <div className="invalid-feedback d-block">{actionData.errors.postalCode}</div>
                )}
              </div>

              <div className="col-sm-6">
                <label htmlFor="country" className={labelStyle}>Country</label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  required
                  placeholder="Your Country"
                  value={profileData.country}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, country: e.target.value }))}
                  className={`${textFieldStyle} ${actionData?.errors?.country ? 'is-invalid' : ''}`}
                />
                {actionData?.errors?.country && (
                  <div className="invalid-feedback d-block">{actionData.errors.country}</div>
                )}
              </div>
            </div>


            <div className="text-center mt-5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg px-5 shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

// loaders and actions remain exactly the same as they are logic-based
export async function profileLoader() {
    try {
      const response = await apiClient.get("/profile"); 
      return response.data;
    } catch (error) {
      throw new Response(
        error.response?.data?.errorMessage ||
          error.message ||
          "Failed to fetch profile details.",
        { status: error.status || 500 }
      );
    }
  }
  
  export async function profileAction({ request }) {
    const data = await request.formData();
    const profileData = {
    name: data.get("name"),
    email: data.get("email"),
    mobileNumber: data.get("mobileNumber"),
    street: data.get("street"),
    city: data.get("city"),
    state: data.get("state"),
    postalCode: data.get("postalCode"),
    country: data.get("country"),
  }; 
  
    try {
      const response = await apiClient.put("/profile", profileData);
      return { success: true, profileData: response.data };
    } catch (error) {
      if (error.response?.status === 400) {
        return { success: false, errors: error.response?.data };
      }
      throw new Response(
        error.response?.data?.errorMessage || "Failed to save details.",
        { status: error.status || 500 }
      );
    }
  }