import React, { useEffect, useState } from 'react';
import Cart from '../../Cart/Cart';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Product from '../Product/Product';
import "./Shop.css"
import { Link } from 'react-router-dom';

const Shop = () => {
   const [products , setProducts] = useState(fakeData)
   const [cart ,setCart] = useState([])
   console.log(setProducts)
// fixed data in cart UI 
   useEffect(()=>{
    const selectedProduct = getDatabaseCart();
    const productKeys = Object.keys(selectedProduct)
    const products = productKeys.map(key => {
       const findProducts = fakeData.find(pd => pd.key === key)
       findProducts.quantity = selectedProduct[key]
       return findProducts
    })
    setCart(products)
 },[])
 //    added quantity in cart
   const handleAddProduct = (product) => {
       const tobeAdded = product.key
    const sameProduct = cart.find(pd => pd.key === tobeAdded)
    let count = 1
    let newCart;
    if(sameProduct){
        count = sameProduct.quantity + 1;
        sameProduct.quantity = count;

        const others = cart.filter(pd => pd.key !== tobeAdded)
        newCart = [...others , sameProduct]
    }
    else{
        product.quantity = 1
        newCart = [...cart , product]
    }
    setCart(newCart)
    addToDatabaseCart(product.key,count)
   }
    return (
        <div className="shop-Container">
            <div className="product-Container">
               {
                   products.map(product =>
                    <Product showAddButton={true} product = {product}
                    handleAddProduct ={handleAddProduct}
                    key={product.key}
                    ></Product>)
               }
            </div>
            <div className="cart-Container">
                <Cart cart={cart}>
                    <Link to="/review"> <button className="main-button">Review Order</button></Link>

                </Cart>
            </div>
        </div>
    );
};

export default Shop;