import { LayoutGrid, Search, ShoppingBag } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import ButtonMUI from '../common/Mui-Components/ButtonMUI'
import { getCategoriesList } from '../../api/GlobalAPI';
import Login from '../../pages/authentication/Login';
import ModalMUICustom from '../common/Mui-Components/ModalMUICustom';

const Header = () => {
    // Xử lý nút đóng mở dropdown
    const [isDropOpen, setIsDropOpen] = useState(false);
    const toggleDropdown = () => { setIsDropOpen(!isDropOpen); }
    const dropdownRef = useRef(null); // Tạo tham chiếu cho dropdown
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

    const [categoriesList, setCategoriesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const data = await getCategoriesList();
                setCategoriesList(data.value?.records || []);
                setLoading(false);
            } catch (error) {
                setError("Can't get API")
                setLoading(false);
            }
        }
        getCategories();
    }, []);

    return (
        <div className='p-5 shadow-md flex justify-between items-center font-primary'>
            {/* Left Navbar*/}
            <div className='flex items-center gap-8'>
                {/* --[Main Logo]----------------------------------------------------------- */}
                <img src="Images/Main-Logo/logo-pizza-4-anh-tai.png" alt="Logo" width={50} height={40} />
                {/* --[Main Logo - End]----------------------------------------------------- */}

                {/* --[Categories Button]--------------------------------------------------- */}
                <div className="relative" ref={dropdownRef}>
                    <h2 className='hidden md:flex gap-2 items-center 
                    border-slate-200 bg-slate-200 
                    rounded-full p-2 px-10 cursor-pointer select-none'
                        onClick={toggleDropdown}
                    >
                        <LayoutGrid /> Category
                    </h2>
                    {isDropOpen && (
                        <div className="absolute top-full left-0 z-10">
                            <ul className='w-44 mt-1 py-2 bg-white shadow-lg rounded-lg border border-gray-200'>
                                <li className='px-4 py-2 font-bold'> Browse Categories </li>
                                <hr className='border-gray-300 my-1' />

                                {error && <p className='px-4 py-2 font-bold text-red-500'>{error}</p>}
                                {loading && <p className='px-4 py-2 font-bold'>{loading}</p>}
                                {categoriesList.map((item, index) => (

                                    <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-2 items-center'
                                        key={index}>
                                        <img src='Images/Category-Image/fried-chicken.png' alt='icon'
                                            width={25} />
                                        <h2>{item.categoryName}</h2>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                {/* --[Categories Button - End]--------------------------------------------- */}

                {/* --[Ô tìm kiếm]---------------------------------------------------------- */}
                <div className="shadow-lg hidden sm:flex md:flex border-2 border-gray-400 rounded-4xl p-2 pl-5 bg-gray-50 w-96">
                    <input type="text" className='bg-transparent outline-none w-full'
                        placeholder='Find Your favorite here 😋' />
                    <Search className='stroke-gray-500' />
                </div>
                {/* --[Ô tìm kiếm - End]---------------------------------------------------- */}
            </div>

            {/* Right Navbar */}
            <div className="flex gap-5 items-center">
                {/* --[Cart Icon]----------------------------------------------------------- */}
                <h2 className='flex gap-2 items-center text-lg'>
                    <ShoppingBag /> <label>0 </label>
                </h2>
                {/* --[Cart Icon - End]----------------------------------------------------- */}

                {/* --[Login Signup]-------------------------------------------------------- */}
                <div className="flex gap-2 items-center">
                    
                    {/* <ButtonMUI variant="outlined">Login</ButtonMUI> */}
                    <Login/>
                    <ButtonMUI variant="contained">Register</ButtonMUI>

                </div>
                {/* --[Login Signup - End]-------------------------------------------------- */}
            </div>
        </div>
    )
}

export default Header