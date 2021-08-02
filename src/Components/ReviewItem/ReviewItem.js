import React from 'react';
import "./ReviewItem.css"

const ReviewItem = (props) => {
    const {name , quantity , img , key , price} = props.product
    return (
        <div className="reviewItems">
            <img src={img} alt="" />
            <h4 className="product-name">{name}</h4>
            <br />
            <p>$ {price}</p>
            <br />
            <p> Quantity : {quantity}</p>
            <br />
            <button className="main-button"
                onClick = {() => props.removeProduct(key)}
            >Remove</button>
        </div>
    );
};

export default ReviewItem;