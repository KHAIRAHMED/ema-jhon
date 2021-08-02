import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    let { productKey } = useParams();
    const product = fakeData.find(product => product.key === productKey)
    return (
        <div>
            <Product showAddButton={false} product={product}></Product> 
        </div>
    );
};

export default ProductDetails;