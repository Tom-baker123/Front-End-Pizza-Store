import React, { useState, useEffect, useRef } from 'react'
import { useCart } from '../../context/CartContext'
import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'


const CartBadge = () => {
    const { cartItems } = useCart();
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    // Đóng Dropdown Menu
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            };
        }
        document.addEventListener("mousedown", handler); // Sự kiện nhấp chuột
        return () => { document.removeEventListener("mousedown", handler) };
    }, []);

    return (
        <div className="relative inline-block" ref={ref}>
            <button onClick={() => setOpen(!open)} className='cursor-pointer'>
                <ShoppingBag className="h-6 w-6 text-gray-800 " />
                {totalItems > 0 && (
                    <span className='absolute -top-2 -right-3 bg-gray-300 rounded-full px-1.5 text-white text-xs font-bold'>
                        {totalItems}
                    </span>
                )}
            </button>


            {/* Khu vực đóng mở dropdown cart */}
            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-4">
                    <h3 className='text-sm font-semibold mb-2 text-gray-700'>Your cart</h3>
                    {cartItems.length === 0 ? (
                        <p className='text-sm text-gray-500'>There is no product here</p>
                    ) : (
                        <>
                            <ul className='space-y-2 max-h-60 overflow-y-auto'>
                                {cartItems.map((item, index) => (
                                    <li key={index} className='flex gap-3 items-center border-b pb-2'>
                                        <img src={item.imageURL} alt={item.name}
                                            className='w-12 h-12 object-cover rounded'
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold">{item.name}</p>
                                            <p className="text-xs text-gray-500">{item.size}</p>
                                            <p className="text-sm text-gray-700">{item.quantity * item.price} VND</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            {cartItems.length > 0 && (
                                <>
                                    <div className="mt-4 pt-2">
                                        <div className="flex justify-between text-sm text-gray-700">
                                            <span>Total: </span>
                                            <span className='font-semibold'>
                                                {cartItems
                                                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                                                    .toLocaleString()} {" "}
                                                VND
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-2">
                                        <Link to="/cart"
                                            onClick={() => setOpen(false)}
                                            className='block w-full bg-primary text-white rounded-sm hover:bg-primary/90 transition text-center text-sm py-2'>
                                            Check your Cart
                                        </Link>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default CartBadge