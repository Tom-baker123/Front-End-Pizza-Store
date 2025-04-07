import React from 'react'
import { getAllCategories, getAllProductsByCategory, getCategoryById } from '../api/GlobalAPI'
import { useParams } from 'react-router-dom'
import Pagination from '../components/common/Pagination';
import CategoryPanel from '../components/layout/CategoryPanel';
import FilterCategory from '../components/layout/FilterCategory';

const FoodCategory = () => {
  const { categoryId } = useParams();
  const { products, error } = getAllProductsByCategory(5,1,categoryId);
  const { categoriesById, loading, error_1} = getCategoryById(categoryId);
  const { categories, loading_2, error_2 } = getAllCategories();
  
  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <div className="p-5 md:p-10 px-3 font-primary">
      <FilterCategory/>
      <CategoryPanel categoriesList={categories}/>

      <h2 className='text-green-600 font-bold text-2xl'> {categories?.categoryName || "No Menu Select" } </h2>
      {products.map((product) => (
        <div className="" key={product.id}> {product.name}</div>
      ))}

      <Pagination/>
    </div>
  )
}

export default FoodCategory