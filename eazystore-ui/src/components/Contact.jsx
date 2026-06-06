import React from "react";
import PageTitle from "./PageTitle";
import { Form } from "react-router-dom";
import apiClient from "../api/apiClient";
import { useActionData, useNavigation, useSubmit } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export default function Contact() {
  const actionData = useActionData();
  const formRef = useRef(null);
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
      toast.success("Your message has been submitted successfully!");
    }
  }, [actionData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to submit the form?"
    );

    if (userConfirmed) {
      const formData = new FormData(formRef.current);
      submit(formData, { method: "post" });
    } else {
      toast.info("Form submission cancelled.");
    }
  };

  return (
    <div className="container my-5 py-4 bg-light text-dark  d-flex flex-column" >
      {/* Page Title */}
      <PageTitle title="Contact Us" />

      {/* Contact Info */}
      <p className="mx-auto mt-4 mb-4 text-center text-muted" style={{ maxWidth: "768px" }}>
        We’d love to hear from you! If you have any questions, feedback, or
        suggestions, please don’t hesitate to reach out.
      </p>

      {/* Contact Form */}
      <Form
        method="POST"
        ref={formRef}
        onSubmit={handleSubmit}
        className="mx-auto"
        style={{ maxWidth: "768px" }}
      >
        {/* Name Field */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-semibold">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            className="form-control"
            required
            minLength={5}
            maxLength={30}
          />
        </div>

        {/* Email and Mobile Row */}
        <div className="row g-3">
          {/* Email Field */}
          <div className="col-sm-6">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your Email"
              className="form-control"
              required
            />
          </div>

          {/* Mobile Field */}
          <div className="col-sm-6">
            <label htmlFor="mobileNumber" className="form-label fw-semibold">
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              name="mobileNumber"
              type="tel"
              required
              pattern="^\d{10}$"
              title="Mobile number must be exactly 10 digits"
              placeholder="Your Mobile Number"
              className="form-control"
            />
          </div>
        </div>

        {/* Message Field */}
        <div className="mb-3 mt-3">
          <label htmlFor="message" className="form-label fw-semibold">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Your Message"
            className="form-control"
            required
            minLength={5}
            maxLength={500}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary px-4 py-2 fs-5"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function contactAction({ request, params }) {
  const data = await request.formData();

  const contactData = {
    name: data.get("name"),
    email: data.get("email"),
    mobileNumber: data.get("mobileNumber"),
    message: data.get("message"),
  };
  try {
    await apiClient.post("/contacts", contactData);
    return { success: true };
    // return redirect("/home");
  } catch (error) {
    throw new Response(
      error.message || "Failed to submit your message. Please try again.",
      { status: error.status || 500 }
    );
  }
}
