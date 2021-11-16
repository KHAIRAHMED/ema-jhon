import React, { useEffect, useState } from 'react';
import Cart from '../../Cart/Cart';
import { getDatabaseCart, removeFromDatabaseCart , processOrder } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import thanksImg from "../../images/giphy.gif"
import { useHistory } from 'react-router-dom';


const Review = () => {
   const [cart ,setCart] = useState([]);
   const [placrOrder , setPlaceorder] = useState(false)
   const history = useHistory()
// remove data 
   const removeProduct = (productKey)=>{
       const remove = cart.filter(pd => pd.key !== productKey)
       setCart(remove)
       removeFromDatabaseCart(productKey)
 
}
// added uuantity 

   useEffect(()=>{
      const selectedProduct = getDatabaseCart();
      const productKeys = Object.keys(selectedProduct)
      fetch("http://localhost:5000/productByKeys",{
          method : "POST",
          headers :{
              "Content-Type": "application/json"
          },
          body: JSON.stringify(productKeys)
      })
      .then(res => res.json())
      .then(data => {
          setCart(data)
      })
   },[])

//    place handle checkout
 const handleProceedCheckout = ()=>{
  history.push("/shipment")
 }

//  thanks img 
let thank;
if(placrOrder){
    thank = <img src={thanksImg} alt="this is thank you img" />
}
    return (
        <div className="shop-Container">
            <div className="product-Container">
                {
                    cart.map(pd => <ReviewItem
                        product ={pd}
                        removeProduct = {removeProduct}
                        key ={pd.key}
                    ></ReviewItem>)
                }
                {thank}
            </div>
            <div className="cart-Container">
                <Cart cart = {cart}>
                        <button onClick = {handleProceedCheckout} className="main-button">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;