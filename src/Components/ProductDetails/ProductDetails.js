import React ,{useEffect , useState}from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = () => {
    let { productKey } = useParams();
    const [product , setProduct ] = useState({})
    useEffect(()=>{
        fetch(`http://localhost:5000/product/${productKey}`)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[productKey])
    return (
        <div>
            <Product showAddButton={false} product={product}></Product> 
        </div>
    );
};

export default ProductDetails;