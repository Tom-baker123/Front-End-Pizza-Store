import React from 'react'
import FoodItem from './FoodItem'

const FoodList = ({ foodList, menuName }) => {
    return (
        <div className='mt-2'> 
            <h2 className='text-green-600 font-bold text-2xl'> {menuName} </h2>
            <div className='grid grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-5 mt-6' >
                {foodList.map((t) => (
                    <FoodItem food={t} key={t.id}/>
                ))}
            </div>

        </div>
    )
}

export default FoodList