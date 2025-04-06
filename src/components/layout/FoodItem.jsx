import React from 'react'
import ButtonCustom from '../common/ButtonCustom'
import ModalTemplate from '../common/ModalTemplate'
import ModalMUI from '../common/Mui-Components/ModalMUI'



const FoodItem = ({ food }) => {
  return (
    <div className='p-2 md:p-6 flex flex-col items-center justify-center 
    gap-3 rounded-lg border border-gray-300 shadow-md hover:scale-110 
    bg-white transition-all ease-in-out hover:shadow-md cursor-pointer'>
      {/* --[Food Item]----------------------------------------------------------- */}
      <img src={food.imageURL} alt={food.name} width={450} height={200}
        className='h-[200px] w-[200px] object-contain' />
      <h2 className='font-bold text-2xl text-gray-800'> {food.name} </h2>
      <div className="flex gap-3">
        <h2 className='font-bold text-gray-600'> {food.price} VND</h2>
        <h2 className='line-through text-gray-500'>{food.price}</h2>
      </div>

      <ModalMUI food={food}>
        <ButtonCustom>Add to cart</ButtonCustom>
      </ModalMUI>


      {/* --[Food Item - End]----------------------------------------------------- */}
    </div>

  )
}

export default FoodItem