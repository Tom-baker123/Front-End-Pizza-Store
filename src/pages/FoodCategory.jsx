import React, { useEffect, useState } from 'react'
import {
  getAllCategories, getCategoryById, getTotalRecords, getFoodByPage
} from '../api/GlobalAPI'
import { useParams } from 'react-router-dom'
import CategoryPanel from '../components/layout/CategoryPanel';
import FoodList from '../components/layout/FoodList';
import Pagination from '../components/common/Pagination';
import { faIR } from '@mui/material/locale';

const FoodCategory = () => {
  const { categoryId } = useParams();

  // ❌ Không xử Lý Phân Trang. 
  const { category, loading: loadingCategories, error_2 } = getCategoryById(categoryId);
  const { categories, loading: loadingAllCategories, error_3 } = getAllCategories();

  // Lấy số trang
  const [foods, setFoods] = useState([]); // Mảng tạm
  const [pageSize, setPageSize] = useState(8);       // số sản phẩm mỗi trang
  const [pageNumber, setPageNumber] = useState(1);   // trang hiện tại
  const [totalsRecord, setTotalsRecords] = useState(0);

  // Xử lý Loading
  const [loadingCategoryPanel, setLoadingCategoryPanel] = useState(true);
  const [loadingFoodsByPage, setLoadingFoodsByPage] = useState(true);

  // Scroll lên top khi đổi trang:
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [pageNumber]);

  // Tự reset về trang 1 nếu đổi categoryId hoặc pageSize:
  useEffect(() => { setPageNumber(1); }, [categoryId, pageSize]);


  // Lấy tổng số sản phẩm
  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const total = await getTotalRecords(categoryId);
        setTotalsRecords(total);
      } catch (error) {
        console.log("Can't get total count: ", error);
      }
    };

    fetchTotal();
  }, [categoryId]);

  // Lấy danh sách sản phẩm theo trang
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const records = await getFoodByPage(pageNumber, pageSize, categoryId);
        setFoods(records);
      } catch (error) {
        console.log("Can't fetch data: ", error);
      } finally {
        setLoadingFoodsByPage(false);
      }
    };
    fetchFoods();
  }, [pageNumber, pageSize, categoryId]);

  const totalPage = Math.ceil(totalsRecord / pageSize);

  return (
    <div className="p-5 md:px-10 px-3 font-primary">
      <div>
        <div>
          <CategoryPanel categoriesList={categories} selectedCategory={categoryId} Loading={loadingAllCategories}/>
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
          <FoodList foodList={foods} Loading={loadingFoodsByPage}/>

          {/* PHÂN TRANG SẢN PHẨM */}
          <Pagination currentPage={pageNumber} totalPages={totalPage} onPageChange={setPageNumber} />
        </div>
      </div>
    </div>
  )
}

export default FoodCategory