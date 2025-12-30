import { useLocation } from "react-router-dom";
import {
  faArrowLeft,
  faShoppingCart,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useCart} from "../store/cart-context"

export default function ProductDetail() {
  const location = useLocation();
  const product = location.state?.product;
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const zoomRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("center");
  const {addToCart} =useCart();
  const handleAddToCart = ()=>{
    if(quantity<1)return;
    addToCart(product,quantity);
  }

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      zoomRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  const handleMouseEnter = () => setIsHovering(true);

  const handleMouseLeave = () => {
    setIsHovering(false);
    setBackgroundPosition("center");
  };

  const handleViewCart = () => navigate("/cart");

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center py-5 bg-light">
      <div className="container bg-white rounded shadow p-4">
        <div className="row g-4">
          {/* Product Image with Zoom Effect */}
          <div
            ref={zoomRef}
            onMouseMove={isHovering ? handleMouseMove : null}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="col-md-6 border rounded overflow-hidden d-flex align-items-center justify-content-center"
            style={{
              backgroundImage: isHovering ? `url(${product.imageUrl})` : "none",
              backgroundSize: isHovering ? "200%" : "cover",
              backgroundPosition: backgroundPosition,
              backgroundRepeat: "no-repeat",
              minHeight: "300px",
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="img-fluid"
              style={{
                maxHeight: "400px",
                objectFit: "contain",
                opacity: isHovering ? 0 : 1, // keep space reserved
                transition: "opacity 0.2s ease-in-out", // smooth fade
              }}
            />
          </div>

          {/* Product Details */}
          <div className="col-md-6 d-flex flex-column justify-content-between">
            <div>
              <Link
                to="/home"
                className="text-decoration-none text-primary fw-medium mb-3 d-inline-flex align-items-center"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Back To All Products
              </Link>

              <h1 className="h2 fw-bold text-dark">{product.name}</h1>
              <p className="text-secondary">{product.description}</p>
              <div className="h4 fw-bold text-success">${product.price}</div>
            </div>

            {/* Quantity + Buttons */}
            <div className="mt-4">
              <div className="d-flex align-items-center mb-3">
                <label htmlFor="quantity" className="me-2 fw-medium">
                  Qty:
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(parseInt(e.target.value) || 1)
                  }
                  className="form-control w-auto"
                />
              </div>

              <button className="btn btn-primary w-100 mb-2" onClick={handleAddToCart}>
                Add to Cart
                <FontAwesomeIcon icon={faShoppingCart} className="ms-2" />
              </button>

              <button
                onClick={handleViewCart}
                className="btn btn-success w-100"
              >
                View Cart
                <FontAwesomeIcon icon={faShoppingBasket} className="ms-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
