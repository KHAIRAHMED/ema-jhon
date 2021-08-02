import React from 'react';

const Cart = (props) => {
    // calculate price product 
    const cart = props.cart
    const price = cart.reduce((price,product)=> price+product.price * product.quantity,0)
    let shippingCost = 0;
    if(price > 35){
        shippingCost = 0;
    }
    else if(price > 15){
        shippingCost = 4.99;
    }
    else if (price > 0){
        shippingCost = 12.99
    }

    const tax = price * 0.1
    const totalPrice = price + shippingCost + tax
    // 2 digit fix function and convert to number 
    const toFixedNumber = num =>{
        const toFixed = num.toFixed(2)
        return Number(toFixed)
    }
    return (
        <div style={{position:'fixed'}}>
            <h4>Order Summary</h4>
            <p>Items Ordered : {cart.length}</p>
            <p>Product price : {toFixedNumber(price)}</p>
            <p><small>Shipping Cost : {shippingCost}</small></p>
            <p>Tax + Vat : {toFixedNumber(tax)}</p>
            <p><strong>Total Price : {toFixedNumber( totalPrice) }</strong></p>
            <br />
            {
                props.children
            }
        </div>
    );
};

export default Cart;