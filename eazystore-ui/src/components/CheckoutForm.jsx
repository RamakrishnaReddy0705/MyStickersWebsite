import React, { useState } from "react";
import { useAuth } from "../store/auth-context";
import apiClient from "../api/apiClient";
import { useCart } from "../store/cart-context";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import PageTitle from "./PageTitle";
import { toast } from "react-toastify";

export default function CheckoutForm() {
  const { user } = useAuth();
  const { cart, totalPrice, clearCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [elementErrors, setElementErrors] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  //const isDarkMode = localStorage.getItem("theme") === "dark";

  // Bootstrap styling constants
  const labelStyle = "form-label fw-bold fs-5 text-primary";
  // Custom wrapper to simulate Bootstrap's "form-control" focus and style for Stripe Iframes
  const stripeElementWrapper = (field) => 
    `form-control py-2 ${elementErrors[field] ? "is-invalid" : ""}`;

  const elementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: isDarkMode ? "#E5E7EB" : "#212529",
        "::placeholder": {
          color: isDarkMode ? "#9CA3AF" : "#6C757D",
        },
      },
      invalid: {
        color: "#DC3545",
      },
    },
  };

  function handleCardChange(field, event) {
    setElementErrors((prev) => ({
      ...prev,
      [field]: event.error ? event.error.message : "",
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    if (Object.values(elementErrors).some((error) => error)) {
      setErrorMessage("Please correct the highlighted errors.");
      return;
    }

    setIsProcessing(true);
    try {
      const response = await apiClient.post("/payment/create-payment-intent", {
        amount: Math.round(totalPrice * 100), // Ensuring it's an integer
        currency: "usd",
      });

      const { clientSecret } = response.data;
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
                line1: user.street,
                city: user.city,
                state: user.state,
                postal_code: user.postalCode,
                country: user.country,
            },
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
        try {
          await apiClient.post("/orders", {
            totalPrice: totalPrice,
            paymentId: paymentIntent.id,
            paymentStatus: paymentIntent.status,
            items: cart.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          });
          sessionStorage.setItem("skipRedirectPath", "true");
          clearCart();
          navigate("/order-success");
        } catch (orderError) {
          setErrorMessage("Order creation failed. Please contact support.");
        }
      }
    } catch (error) {
      setErrorMessage("Error processing payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center bg-light dark-bg-dark" style={{ minHeight: "852px" }}>
      {/* Loading State */}
      {isProcessing ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <p className="h4 fw-normal text-primary">
            Processing Payment... Please don't refresh.
          </p>
        </div>
      ) : (
        /* Form State */
        <div className="card shadow border-0 w-100" style={{ maxWidth: "450px" }}>
          <div className="card-body p-4">
            <PageTitle title="Complete Your Payment" />

            <p className="text-center mt-4 mb-4 fs-5 text-muted">
              Amount to be charged: <strong className="text-dark">${totalPrice.toFixed(2)}</strong>
            </p>

            <form onSubmit={handleSubmit}>
              {errorMessage && (
                <div className="alert alert-danger text-center py-2 mb-4" role="alert">
                  {errorMessage}
                </div>
              )}

              {/* Card Number */}
              <div className="mb-4">
                <label className={labelStyle}>Card Number</label>
                <div className={stripeElementWrapper("cardNumber")}>
                  <CardNumberElement options={elementOptions} onChange={(e) => handleCardChange("cardNumber", e)} />
                </div>
                {elementErrors.cardNumber && (
                  <div className="text-danger small mt-1">{elementErrors.cardNumber}</div>
                )}
              </div>

              {/* Card Expiry */}
              <div className="mb-4">
                <label className={labelStyle}>Expiry Date</label>
                <div className={stripeElementWrapper("cardExpiry")}>
                  <CardExpiryElement options={elementOptions} onChange={(e) => handleCardChange("cardExpiry", e)} />
                </div>
                {elementErrors.cardExpiry && (
                  <div className="text-danger small mt-1">{elementErrors.cardExpiry}</div>
                )}
              </div>

              {/* Card CVC */}
              <div className="mb-4">
                <label className={labelStyle}>CVC</label>
                <div className={stripeElementWrapper("cardCvc")}>
                  <CardCvcElement options={elementOptions} onChange={(e) => handleCardChange("cardCvc", e)} />
                </div>
                {elementErrors.cardCvc && (
                  <div className="text-danger small mt-1">{elementErrors.cardCvc}</div>
                )}
              </div>

              {/* Submit Button */}
              <div className="d-grid gap-2 mt-4">
                <button
                  type="submit"
                  disabled={!stripe || isProcessing}
                  className="btn btn-primary btn-lg py-2"
                >
                  {isProcessing ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Processing...
                    </>
                  ) : (
                    "Pay Now"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}