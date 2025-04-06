import React from 'react'
import { getAllProductsByCategory } from '../api/GlobalAPI'

const FoodCategory = () => {
    console.log("FoodCategory",  getAllProductsByCategory(5, 1, 1))

  return (
    <div>FoodCategory</div>
  )
}

export default FoodCategory