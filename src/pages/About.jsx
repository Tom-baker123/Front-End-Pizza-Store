import React from 'react'
import toast from 'react-hot-toast'
import { postCart } from '../api/GlobalAPI'

const About = () => {
  const handleAddToCart = async () => {
    try{
      const data = {
        userID: 23,
        productID: 2,
        quantity: 1,
      }

      const res = await postCart(data);
      console.log("Cart status", res);
      toast.success("You have add your product into your card");
    }catch(err){
      toast.error("Can't Add to Cart");
      console.log("Add to cart", err);
    }
  }
  
  return (
    <button onClick={handleAddToCart} className='m-2 bg-blue-500 rounded-sm p-2 cursor-pointer text-white'>
      Add to cart
    </button>
  )
}

export default About