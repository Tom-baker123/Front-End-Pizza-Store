import React, { useState } from 'react'
import ButtonAddToCart from '../common/ButtonAddToCart'
import SizeButtonList from '../common/SizeButtonList';

const FoodItemDetail = ({ food }) => {

    const [foodTotalPrice, setFoodTotalPrice] = useState(food.price ? food.price : 0);
    const [quantity, setquantity] = useState(1);

    // Hàm xử lý khi chọn size
    const handleSizeChange = (additionalPrice) => {
        setFoodTotalPrice(food.price + additionalPrice); // Cập nhật giá tổng
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 px-7 
        bg-white text-black'>
            <img src={food.imageURL} alt={food.name} width={300} height={300}
                className='mx-auto p-5 sm:h-[350px] w-[320px] bg-slate-200 
                object-contain rounded-md md:sticky md:top-0'
            />
            <div className="flex flex-col gap-3 mt-3 sm:mt-0">
                <h2 className='text-2xl font-bold'>{food.name}</h2>
                <h2 className='text-sm font-bold text-gray-500'>{food.description}</h2>
                <div className="flex gap-3 text-2xl items-center">
                    <h2 className='font-bold'> {food.price} VND</h2>
                    <h2 className='line-through text-sm text-gray-500'>{food.price} VND</h2>
                </div>

                
                <h2 className='font-bold'> Size </h2>
                <SizeButtonList onSizeChange={handleSizeChange}/> <hr />   

                <div className="
                flex flex-col gap-3
                md:flex md:flex-row md:items-center md:gap-2 md:justify-between
                lg:flex lg:flex-row lg:items-center lg:gap-2 lg:justify-between">
                    <div className="">
                        <div className="flex p-2 border gap-10 justify-between
                        items-center rounded-md font-bold px-8">
                            <button className='cursor-pointer'
                                disabled={quantity == 1} onClick={() => setquantity(quantity - 1)}>-</button>
                            <h2>{quantity}</h2>
                            <button className='cursor-pointer' onClick={() => setquantity(quantity + 1)}>+</button>
                        </div>
                    </div>
                    <ButtonAddToCart> Cart </ButtonAddToCart>
                </div>
                <h2>{(quantity * foodTotalPrice).toFixed(0)} VND</h2>
            </div>
        </div>
    )
}

export default FoodItemDetail