import React from 'react';
import fakeData from "../../fakeData/"
const Invertory = () => {
    const addProduct = ()=>{
        console.log(fakeData)
        fetch("http://localhost:5000/addProduct",{
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body : JSON.stringify(fakeData)
        })
        .then(res => res.json())
        .then(result => {
            console.log(result)
        })
    }
    return (
        <div>
            <button onClick={addProduct}>Add Product</button>
        </div>
    );
};

export default Invertory;