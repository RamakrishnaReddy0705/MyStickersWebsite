import React from "react";
import Header from "./Header";
import Footer from "./footer/Footer";
import PageTitle from "./PageTitle";
import errorImage from "../assets/util/error.png";
import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const routeError = useRouteError();
  let errorTitle = "Oops! Something went wrong";
  let errorMessage = "An unexpected error occurred. Please try again later.";
  if (routeError) {
    errorTitle = routeError.status;
    errorMessage = routeError.data;
  }
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      
      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="py-5 bg-light w-100">
          <div className="container px-4">
            <PageTitle title={errorTitle} />
          </div>
          <div className="text-center text-muted d-flex flex-column align-items-center">
            <p
              className="mx-auto px-2 mb-3"
              style={{ maxWidth: "576px", lineHeight: "1.5" }}
            >
              {errorMessage}
            </p>
            <img
              src={errorImage}
              alt="Error"
              className="img-fluid mx-auto mb-4"
              style={{ maxWidth: "576px" }}
            />
            <Link
              to="/home"
              className="btn btn-primary btn-lg fw-semibold"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
