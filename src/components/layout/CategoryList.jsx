import { LoaderCircle } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'


const CategoryList = ({ categoriesList, Loading }) => {
    
    return (
        <div className='mt-5'>
            <h2 className='text-green-600 font-bold text-2xl mb-2'> Menu </h2>
            <div className="grid grid-cols-3 gap-5
                    sm:grid-cols-4
                    md:grid-cols-6 
                    lg:grid-cols-7">
                {/* --[All Food]---------------------------------------------------------- */}
                <Link to={`/food-category/all`} className="flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-200">
                    <img src="/Images/Category-Image/Combo.png" alt="icon" width={50} height={50}
                        className='hidden sm:flex group-hover:scale-125 transition-all ease-in-out'
                    />
                    <h2 className='font-bold text-green-800'>ALL</h2>
                </Link>
                {/* --[All Food]---------------------------------------------------------- */}


                {(categoriesList && categoriesList.length > 0) ?
                    categoriesList.map((item, index) => (
                        <Link to={`/food-category/` + item.categoryId} className="flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-200" key={index} >
                            <img src="/Images/Category-Image/pizza.png" alt="icon" width={50} height={50}
                                className='hidden sm:flex group-hover:scale-125 transition-all ease-in-out'
                            />
                            <h2 className='font-bold text-green-800'>{item.categoryName}</h2>
                        </Link>
                    )) : (
                        <>
                            <div className="flex flex-col justify-center items-center bg-green-50 gap-2 p-3 rounded-lg cursor-pointer hover:bg-green-200">
                                {Loading ? <LoaderCircle className='animate-spin'/>
                                    : (<>
                                        <img src="/Images/Icon/Fail.png" alt="icon" width={50} height={50}
                                            className='hidden sm:flex group-hover:scale-125 transition-all ease-in-out'
                                        />
                                        <h2 className='text-red-500 font-bold'>API FAIL</h2>
                                    </>)}
                            </div>
                        </>
                    )
                }
            </div>
        </div >
    )
}

export default CategoryList