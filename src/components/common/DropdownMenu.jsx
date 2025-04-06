import React, { useState, useEffect, useRef } from 'react'

const DropdownMenu = ({children}) => {
    const [isDropOpen, setIsDropOpen] = useState(false);
    const dropdownRef = useRef(null); // Tạo tham chiếu cho dropdown

    const toogleDropdown = () => {
        setIsDropOpen(!isDropOpen);
    }

    const handleClickOutside = (event) => {
        // Kiểm tra nếu nhấp ra ngoài dropdown
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropOpen(false); // Đóng dropdown
        }
    };

    useEffect(() => {
        // Gắn sự kiện click vào document
        document.addEventListener('click', handleClickOutside);
        return () => {
            // Hủy sự kiện khi component bị unmount
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    

    return (
        <div className="relative" ref={dropdownRef}>
            <div className="cursor-pointer" onClick={toogleDropdown}>
                <img className='text-amber-100 font-primary' src="/Images/Icon/Profile-user.png" alt="Menu_Icon" width={30}/>
            </div>
            {isDropOpen && (
                <div className="absolute top-full right-0 z-20">
                    <ul className='w-44 mt-1 py-2 bg-white shadow-lg rounded-lg border border-gray-200'>
                        {children}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default DropdownMenu