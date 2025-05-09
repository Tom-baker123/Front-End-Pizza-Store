import React, { useEffect } from 'react'
import Slider from '../components/layout/Slider'
import CategoryList from '../components/layout/CategoryList'
import { getAllCategories, getAllProducts } from '../api/GlobalAPI';
import FoodList from '../components/layout/FoodList';
import Footer from '../components/layout/Footer';
import { QueryURL } from '../routes/QueryURL';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const Home = () => {
  // URL Query:
  const query = QueryURL();
  const isPaid = query.get("payment"); // Lấy giá trị của paid
  const navigate = useNavigate();

  useEffect(()=>{
    if (isPaid === "true") {
      toast(
        "💖 Thanks for your order. \nAnd I hope you enjoy your meal, soon! 😋",
        { duration: 6000, }
      );
      navigate("/");
    }
  }, [])

  const { categories, loading: loadingCategories, error_1 } = getAllCategories(); // Nhớ tạo custom Loading
  const { products, loading: loadingFoods, error_2, totalRecords } = getAllProducts(8, 1);



  return (
    <div className='p-5 md:p-10 px-3 font-primary'>
      {/* Slider */}
      <Slider />
      {/* Slider - End */}

      {/* Category List */}
      <CategoryList categoriesList={categories} Loading={loadingCategories}/>
      {/* Category List - End */}

      {/* Food List */}
      <FoodList foodList={products} menuName={"Popular menu"} Loading={loadingFoods} />
      {/* Food List - End */}

      {/* Banner */}
      <img src="/Images/Banner/Banner-Pizza.jpg" alt="Banner_1" width={1200} height={300}
        className="grid grid-cols-1 w-full h-[350px] rounded-lg object-cover my-10" />
      {/* Banner - End */}

      {/* Footer */}
      <Footer />
      {/* Footer - End */}


    </div>
  )
}

export default Home