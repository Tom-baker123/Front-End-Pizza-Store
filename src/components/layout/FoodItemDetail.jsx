import React, { useState } from 'react'
import ButtonCustom from '../common/ButtonCustom'
import ButtonAddToCart from '../common/ButtonAddToCart'
import SizeButtonList from '../common/SizeButtonList';
import ToppingButton from '../common/ToppingButton';

const FoodItemDetail = ({ food }) => {

    const [foodTotalPrice, setFoodTotalPrice] = useState(
        food.price
    );

    const [quantity, setquantity] = useState(1);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 px-7 
        bg-white text-black'>
            <img src={food.url} alt={food.name} width={300} height={300}
                className='p-5 sm:h-[350px] w-[320px] bg-slate-200 
                object-contain rounded-md sticky top-0'
            />
            <div className="flex flex-col gap-3 mt-3 sm:mt-0">
                <h2 className='text-2xl font-bold'>{food.name}</h2>
                <h2 className='text-sm font-bold text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quis hic explicabo blanditiis excepturi omnis? Minima </h2>
                <div className="flex gap-3 text-2xl items-center">
                    <h2 className='font-bold'> {food.price} VND</h2>
                    <h2 className='line-through text-sm text-gray-500'>{food.price} VND</h2>
                </div>

                <h2 className='font-bold'> Quantity (8 Slice)</h2>

                <h2 className='hidden'> = {(quantity * foodTotalPrice).toFixed(2)} </h2>
                
                <h2 className='font-bold'> Size </h2>
                <SizeButtonList /> <hr />

                <h2 className='font-bold'> Topping for pizza crust</h2>
                <ToppingButton /> <hr />

                <div className="flex items-center gap-2 justify-between">
                    <div className="">
                        <div className="p-2 border flex gap-10 items-center rounded-md font-bold px-8">
                            <button className='cursor-pointer'
                                disabled={quantity == 1} onClick={() => setquantity(quantity - 1)}>-</button>
                            <h2>{quantity}</h2>
                            <button className='cursor-pointer' onClick={() => setquantity(quantity + 1)}>+</button>
                        </div>
                    </div>

                    <ButtonAddToCart> Add To Cart </ButtonAddToCart>
                </div>
                <h2> <span className='text-sm font-bold'>Category </span> ... </h2>
            </div>
        </div>
    )
}

export default FoodItemDetail