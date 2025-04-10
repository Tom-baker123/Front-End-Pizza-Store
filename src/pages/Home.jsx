import React from 'react'
import Slider from '../components/layout/Slider'
import CategoryList from '../components/layout/CategoryList'
import { getAllCategories, getAllProducts, getPromotion } from '../api/GlobalAPI';
import FoodList from '../components/layout/FoodList';
import Footer from '../components/layout/Footer';
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {

  const { categories, loading, error } = getAllCategories();
  const { products, error_1, totalRecords } = getAllProducts(8, 1);
  const { promotion, loading_2, error_2 } = getPromotion();


  console.log("Promotion",promotion)

  return (
    <div className='p-5 md:p-10 px-3 font-primary'>
      {/* Slider */}
      <Slider/>
      {/* Slider - End */}

      {/* Category List */}
      <CategoryList categoriesList={categories}/>
      {/* Category List - End */}

      {/* Food List */}
      <FoodList foodList={products} menuName={"Popular menu"}/>
      {/* Food List - End */}

      {/* Banner */}
      <img src="/Images/Banner/Banner-Pizza.jpg" alt="Banner_1" width={1200} height={300} 
        className="grid grid-cols-1 w-full h-[350px] rounded-lg object-cover my-10"/>
      {/* Banner - End */}

      {/* Footer */}
      <Footer/>
      {/* Footer - End */}

      
    </div>
  )
}

export default Home