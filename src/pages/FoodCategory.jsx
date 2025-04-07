import React, { useState } from 'react'
import { getAllCategories, getAllProducts, getAllProductsByCategory, getCategoryById } from '../api/GlobalAPI'
import { useParams } from 'react-router-dom'
import CategoryPanel from '../components/layout/CategoryPanel';
import FoodList from '../components/layout/FoodList';
import Pagination from '../components/common/Pagination';

const FoodCategory = () => {
  const { categoryId } = useParams();
  // Lấy API
  const { products, error_1 } = getAllProducts("", "");
  const { category, loading_2, error_2 } = getCategoryById(categoryId);
  const { categories, loading_3, error_3 } = getAllCategories();


  const [pageSize, setPageSize] = useState(5);     // số sản phẩm mỗi trang
  const [pageNumber, setPageNumber] = useState(1);   // trang hiện tại
  const { product, loading, error, totalRecords } = getAllProductsByCategory(pageSize, pageNumber, categoryId);
  const totalPages = Math.ceil(totalRecords / pageSize) || 1; // Đảm bảo ít nhất có 1 trang

  return (
    <div className="p-5 md:px-10 px-3 font-primary">
      <div>
        <div className="">
          <CategoryPanel categoriesList={categories} selectedCategory={categoryId} />
        </div>
        <div >
          <div className="flex justify-between items-center gap-3 my-5">

            <h2 className='text-green-600 font-bold text-2xl'> {category?.categoryName || "No Menu Select"} Menu</h2>

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

          <FoodList foodList={categoryId == "all" ? products: product}/>

          {/* <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}>Trang trước</button><br />
          <button onClick={() => setPageNumber(pageNumber + 1)}>Trang sau</button><br /> */}
          {totalRecords > 0 &&(
          <Pagination
            currentPage={pageNumber}
            totalPages={totalRecords}
            onPageChange={(page) => setPageNumber(Math.max(1, Math.min(page, totalRecords)))}
          />)}
        </div>
      </div>
    </div>
  )
}

export default FoodCategory