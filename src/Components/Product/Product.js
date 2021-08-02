import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import "./Product.css"
import {Link } from "react-router-dom";
const Product = (props) => {
    const {product , handleAddProduct} = props
   const {img,name,seller,price,stock,key} = product
    return (
        <div className="product">
           <div>
                <img src={img} alt="" />
           </div>
           <div className="product-details">
               <h4 className="product-name"><Link to ={"/product/" + key}>{name}</Link></h4>
               <br />
               <p><small>by:{seller}</small></p>
               <p>${price}</p>
               <br />
               <p><small>Only {stock} left in soon - Order soon</small>
               </p>
               {
                    props.showAddButton && <button 
                    onClick ={()=>(handleAddProduct(product))}
                    className="main-button">  
                    <FontAwesomeIcon icon={faShoppingCart}/> Add To Cart</button>
               }
           </div>
        </div>
    );
};

export default Product;