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
    <div className="container my-4">
      <div className="table-responsive">
        <table className="table align-middle text-center border">
          <thead className="table-primary text-uppercase small">
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item) => (
              <tr key={item.productId}>
                {/* Product Column */}
                <td className="d-flex align-items-center gap-3">
                  <Link
                    to={`/products/${item.productId}`}
                    state={{ product: item }}
                    className="text-decoration-none d-flex align-items-center"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="rounded"
                      style={{
                        width: "64px",
                        height: "64px",
                        objectFit: "cover",
                        transition: "0.2s",
                      }}
                    />

                    <span className="fw-semibold text-dark ms-3">
                      {item.name}
                    </span>
                  </Link>
                </td>

                {/* Quantity */}
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    className="form-control text-center"
                    style={{ width: "70px" }}
                    onChange={(e) =>
                      updateCartQuantity(
                        item.productId,
                        parseInt(e.target.value, 10) || 1
                      )
                    }
                  />
                </td>

                {/* Price */}
                <td className="fw-semibold">${item.price.toFixed(2)}</td>

                {/* Remove Button */}
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeFromCart(item.productId)}
                    aria-label="delete-item"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </td>
              </tr>
            ))}

            {/* Subtotal Row */}
            {cart.length > 0 && (
              <tr className="fw-bold">
                <td></td>
                <td className="text-uppercase text-muted">Subtotal</td>
                <td className="text-primary fs-5">${subtotal}</td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
