import { Image } from '@mui/icons-material'
import React from 'react'

const FoodItem = () => {
    return (
        <>
            <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                 {/* Hình ảnh sản phẩm  */}
                <Image className="w-full h-48 object-cover" src="https://via.placeholder.com/300" alt="Product Image"/>

                     {/* Nội dung card  */}
                    <div className="p-4">
                         {/* Tiêu đề sản phẩm  */}
                        <h3 className="text-lg font-semibold text-gray-800 truncate">Tên sản phẩm</h3>

                         {/* Mô tả ngắn  */}
                        <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                            Đây là mô tả ngắn về sản phẩm, hiển thị tối đa 2 dòng trên mobile.
                        </p>

                         {/* Giá  */}
                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-xl font-bold text-gray-900">$99.99</span>
                            <span className="text-sm text-gray-500 line-through">$129.99</span>
                        </div>

                         {/* Nút hành động  */}
                        <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                            Thêm vào giỏ hàng
                        </button>
                    </div>
            </div>
        </>
    )
}

export default FoodItem