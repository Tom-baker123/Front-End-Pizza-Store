import React, { useEffect, useState } from 'react'
import {
  getAllCategories, getCategoryById,
  getTotalRecords, getFoodByPage,
  getAllProducts, getAllProductsByCategory
} from '../api/GlobalAPI'
import { useParams } from 'react-router-dom'
import CategoryPanel from '../components/layout/CategoryPanel';
import FoodList from '../components/layout/FoodList';
import Pagination from '../components/common/Pagination';

const FoodCategory = () => {
  const { categoryId } = useParams();

  // ❌ Không xử Lý Phân Trang. 
  const { category, loading_2, error_2 } = getCategoryById(categoryId);
  const { categories, loading_3, error_3 } = getAllCategories();

  // 🟢 Gọi 1 lần để lấy totalRecords
  const { products, loading_1, error_1, totalRecords_1 } = getAllProducts("", "");
  const { product, loading, error, totalRecords } = getAllProductsByCategory("", "", categoryId);

  // Lấy số trang
  const [foods, setFoods] = useState([]); // Mảng tạm
  const [pageSize, setPageSize] = useState(8);       // số sản phẩm mỗi trang
  const [pageNumber, setPageNumber] = useState(1);   // trang hiện tại
  const [totalsRecord, setTotalsRecords] = useState(0);

  // Scroll lên top khi đổi trang:
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageNumber]);
  
  // Tự reset về trang 1 nếu đổi categoryId hoặc pageSize:
  useEffect(() => {
    setPageNumber(1);
  }, [categoryId, pageSize]);
  

  // Lấy tổng số sản phẩm
  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const total = await  getTotalRecords(categoryId);
        setTotalsRecords(total);
      } catch (error){
        console.log("Can't get total count: ", error);
      }
    };

    fetchTotal();
  }, []);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const records = await getFoodByPage(pageNumber, pageSize, categoryId);
        setFoods(records);
      }catch (error){
        console.log("Can't fetch data: ", error);
      }
    };
    fetchFoods();
  }, [pageNumber, pageSize, categoryId]);

  const totalPage = Math.ceil(totalRecords / pageSize);

  return (
    <div className="p-5 md:px-10 px-3 font-primary">
      <div>
        <div>
          <CategoryPanel categoriesList={categories} selectedCategory={categoryId} />
        </div>
        <div >
          <div className="flex justify-between items-center gap-3 my-5">

            <h2 className='text-green-600 font-bold text-2xl'>
              {categoryId == "all" ? "All" : category?.categoryName || "No Menu Select"} Menu
            </h2>

            <div className="">
              <label htmlFor="pageSize" className="text-sm font-medium">
                Số sản phẩm / trang:
              </label>
              <input
                id="pageSize" type="number" value={pageSize} min={5}
                onChange={(e) => {
                  const newSize = parseInt(e.target.value);
                  setPageSize(isNaN(newSize) ? 5 : Math.max(newSize, 5));
                }}
                className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          {/* DANH SÁCH SẢN PHẨM */}

          <FoodList foodList={foods} />

          <Pagination 
            currentPage={pageNumber} totalPages={totalPage} onPageChange={setPageNumber}
          />
        </div>
      </div>
    </div>
  )
}

export default FoodCategory