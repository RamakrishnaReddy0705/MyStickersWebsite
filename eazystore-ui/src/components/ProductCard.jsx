
import Price from './Price'
import { Link } from 'react-router-dom'
//import { useContext } from 'react'
//import { CartContext } from '../store/cart-context'
import {useCart} from "../store/cart-context"

export default function ProductCard({product}) {
        const {addToCart}=useCart();
  return (
    <div className="product-card">
        <Link className="product-card-image-container"  to={`/products/${product.productId}`} state={{product}}>
            <img src={product.imageUrl} alt={product.name} className="product-card-image">
            </img>
        </Link >
        <div className="product-card-details">
            <h2 className="product-card-title">{product.name}</h2>
            <p className="product-card-description">{product.description}</p>
            <div className="product-card-footer">
            <div className="product-card-price">
                <Price currency="$" price={product.description}></Price>
            </div>
            <button className="btn bg-primary text-white fw-medium fs-6 py-2 px-4 rounded" style={{ cursor: "pointer" }} onClick={()=>addToCart(product,1)}>
                   Cart
            </button>
        </div>
        </div>
        
    </div>
  )
}
