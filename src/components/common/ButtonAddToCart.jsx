import React, { Children } from 'react'

const ButtonAddToCart = ({children, onClick}) => {
    return (
        <button onClick={onClick} className="border font-medium rounded-sm py-2 px-8 border-transparent 
        text-white bg-green-600 hover:bg-green-800 transition-all
            flex items-center gap-2 cursor-pointer" >
            <img src="/Images/Icon/Icon_shopping-cart.png" alt="" width={15} />
            {children}
        </button>
    )
}

export default ButtonAddToCart 