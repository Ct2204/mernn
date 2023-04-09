import React from "react";
import { Link } from "react-router-dom";
import ReactStars from 'react-rating-stars-component'
import './productCard.css'


function ProductCard({ product }) {
    const options = {
        edit: false,
        color: 'rgba(20,20,20,0.1)',
        activeColor: 'tomato',
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHaft: true,
    }
    
    return (
        <Link className="productCard" to={`/product/${product._id}`}>
        <img className="productCard-Img" src={product.images[0].url} alt={product.name} />
        <p className="productCard-name">{ product.name}</p>
        <div className="productCard-review">
                <ReactStars {...options} /><span>({ product.numOfReviews} Review )</span>
        </div>
        <span className="productCard-price">{ `${product.price} VND`}</span>
        </Link>
      );
}

export default ProductCard;