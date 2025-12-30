import React from "react";
import { useCart } from "../store/cart-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function CartTable() {
  const { cart, addToCart, removeFromCart } = useCart();

  const subtotal = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const updateCartQuantity = (productId, quantity) => {
    const product = cart.find((item) => item.productId === productId);
    addToCart(product, quantity - (product?.quantity || 0));
  };

  return (
    <div className="container py-5">

      {/* Center title */}
      <h2 className="text-center fw-bold text-primary mb-4">Your Cart</h2>

      {/* Centered responsive table */}
      <div className="table-responsive mx-auto" style={{ maxWidth: "900px" }}>
        <table
          className="table table-bordered text-center align-middle w-100"
          style={{ tableLayout: "fixed" }}
        >
          <thead className="table-dark">
            <tr>
              <th className="text-start">Product</th>
              <th style={{ width: "120px" }}>Quantity</th>
              <th style={{ width: "120px" }}>Price</th>
              <th style={{ width: "90px" }}>Remove</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item) => (
              <tr key={item.productId}>
                <td className="text-start">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="rounded"
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />

                    <Link
                      to={`/products/${item.productId}`}
                      state={{ product: item }}
                      className="fw-semibold text-decoration-none text-dark"
                    >
                      {item.name}
                    </Link>
                  </div>
                </td>

                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateCartQuantity(item.productId, Number(e.target.value))
                    }
                    className="form-control text-center mx-auto"
                    style={{ width: "75px" }}
                  />
                </td>

                <td className="fw-bold text-success">
                  ${item.price.toFixed(2)}
                </td>

                <td>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="btn btn-outline-danger btn-sm"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </td>
              </tr>
            ))}

            {cart.length > 0 && (
              <tr className="fw-bold">
                <td></td>
                <td className="text-muted">Subtotal</td>
                <td className="text-primary fs-5">${subtotal}</td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
        <Link to="/home" className="btn btn-primary px-4">
          Back to Products
        </Link>
        <Link to="/checkout"  className="btn btn-success px-4">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
