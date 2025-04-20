import { LoaderCircle } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const CategoryPanel = ({ categoriesList, selectedCategory, Loading }) => {

    console.log("CategoryPanel", selectedCategory)
    return (
        <>
            <div className='flex flex-col gap-3'>
                <h2 className='text-green-600 font-bold text-2xl'> Menu </h2>
                <div className="flex flex-wrap gap-2">
                    {/* --[All Food]---------------------------------------------------------- */}
                    <Link to={`/food-category/all`}
                        className={`flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-200
                        ${String(selectedCategory) === "all" && 'bg-green-300 text-white'}`}
                    >
                        <h2 className='font-bold text-green-800'>ALL</h2>
                    </Link>
                    {/* --[All Food]---------------------------------------------------------- */}


                    {(categoriesList && categoriesList.length > 0) ?
                        categoriesList.map((item, index) => (
                            <Link to={`/food-category/` + item.categoryId}
                                className={`flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-200 
                                ${String(selectedCategory) === String(item.categoryId) && 'bg-green-300 text-white'}`}
                                key={index}
                            >
                                <h2 className='font-bold text-green-800'>{item.categoryName}</h2>
                            </Link>

                        )) : (
                            <>
                                <div className="flex flex-col justify-center items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-200">
                                    {Loading ? <LoaderCircle className='animate-spin' />
                                        : (<>
                                            <img src="/Images/Icon/Fail.png" alt="icon" width={50} height={50}
                                                className='hidden sm:flex group-hover:scale-125 transition-all ease-in-out'
                                            />
                                            <h2 className='text-red-500 font-bold'>API FAIL</h2>
                                        </>)}
                                </div>
                            </>)
                    }
                </div>
            </div >
        </>
    )
}

export default CategoryPanel