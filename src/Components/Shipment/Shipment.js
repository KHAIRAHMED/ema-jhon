import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart ,processOrder } from '../../utilities/databaseManager';
import "./Shipment.css";
const Shipment = () => {
    const [loggedInUser ] = useContext(userContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data =>{
      const selectedProduct = getDatabaseCart();
      const orderProduct = {...loggedInUser , orderProduct : selectedProduct , orderDate : new Date() , shipmentDetails : data} 
      fetch("http://localhost:5000/addOrder",{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(orderProduct)
      })
      .then(res => res.json())
      .then(data => {
        if(data){
          processOrder()
          alert("data received your")
        }
      
      })
    }
  
  
  
    return (
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue={loggedInUser.name} {...register("name", { required: true })}  placeholder="Enter Name" />
        {errors.name && <span className="error">Name is required</span>}

        <input defaultValue={loggedInUser.email} {...register("email", { required: true })}  placeholder="Enter Phone Email" />
        {errors.email && <span className="error">email is required</span>}

        <input {...register("address", { required: true })}  placeholder="Enter Address" />
        {errors.address && <span className="error">Address is required</span>}

        <input {...register("phone", { required: true })}  placeholder="Enter Phone Number" />
        {errors.phone && <span className="error" >Phone is required</span>}
        
        <input type="submit" />
      </form>
    );
  
};

export default Shipment;