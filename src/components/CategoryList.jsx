import React, { useEffect, useState } from 'react'
import { FoodCategory } from '../data/FakeData'
import { Link, useSearchParams } from 'react-router-dom';



const CategoryList = () => {
  // Lấy id từ URL có giá trị từ và gán vào biến id
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  console.log(categoryId);

  const [selectedCategory, setSelectedCategory] = useState('all');
  useEffect(() => {
    setSelectedCategory(categoryId);
  }, [searchParams])

  // Đang làm
  return (
    <div className="mt-3 scroll-smooth">
      <div className='flex gap-4 overflow-auto hide-scrollbar'>
        {FoodCategory.map((t) => (
          // Link 
          <Link to={`?category=${t.id}`} key={t.id}
            className={`flex flex-col items-center gap-2 px-1 py-3 min-w-28 
            rounded-2xl border-3 border-transparent
            hover:border-primary hover:bg-[#DEEDE3] 
            cursor-pointer group 
            ${selectedCategory == t.id && 'text-primary font-extrabold bg-[#DEEDE3] border-primary'}`}>

            {(t.url != "" || t.name == id) ?
              (
                <>

                  <img src={t.url} alt="" width={30} height={30}
                    className='group-hover:scale-125 transition-all duration-200'
                  />
                  <h2 className='text-sm font-medium'>{t.name} </h2>
                </>
              )
              : console.log(t.url = "😥")
            }
          </Link>
        ))}
      </div>
      
      
      {/* <a href="#about" class="text-blue-500 hover:text-blue-700">Đi đến Giới thiệu</a>

      <section id="about" class="mt-20 p-6 bg-gray-100">
        <h2 class="text-xl font-bold">Giới thiệu</h2>
        <p>Nội dung giới thiệu...</p>
      </section> */}
    </div>
  )
}
export default CategoryList;