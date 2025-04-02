import React, { Children } from 'react'

const ButtonCustom = ({children}) => {
    return (
        <button className="border font-medium rounded-sm p-3 border-gray-300 
            text-primary hover:bg-green-700 hover:text-white transition-all
            flex items-center gap-2 cursor-pointer" 
            onClick={() => { }}>

            <img src="Images/Icon/Icon_shopping-cart.png" alt="" width={20} />
            {children}

        </button>
    )
}

export default ButtonCustom 