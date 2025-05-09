import { LayoutGrid, Search, ShoppingBag } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { getCategoriesList } from '../../api/GlobalAPI';
import Login from '../../pages/authentication/Login';
import Register from '../../pages/authentication/Register';
import { useAuth } from '../../context/AuthContext';
import DropdownMenu from '../common/DropdownMenu';
import { Link, useNavigate } from 'react-router-dom';
import SearchInput from './SearchInput';
import CartBadge from '../common/CartBadge';
import { QueryURL } from '../../routes/QueryURL';
import { useBreakpoint } from '../../context/BreakpointContext';

const Header = () => {
    // Xử lý responsive breakpoint
    const { breakpoint, orientation } = useBreakpoint();

    // Xử lý điều hướng
    const navigate = useNavigate();
    const query = QueryURL(); // Lấy query url // const query = useQuery();
    const isLoggedOut = query.get("logout"); // Lấy giá trị của ?logout
    const isAdmin = localStorage.getItem("role"); // Lấy value role

    // Xử lý đăng nhập và đăng ký
    const { auth, logout } = useAuth();

    // Xử lý sự kiện nhấp chuột bên ngoài dropdown
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

    if (isLoggedOut === "true") {
        logout();
        navigate("/");
    }

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
                setError("Can't get API");
                setLoading(false);
            }
        };
        getCategories();
    }, []);

    // Chức năng Quay lại trang chủ
    const handleToHome = () => { navigate("/"); };

    // Chức năng chuyển hướng đến trang giỏ hàng
    const handleToCart = () => { navigate("/cart"); };



    return (
        <div className='p-5 shadow-md flex justify-between items-center font-primary'>
            {/* Left Navbar */}
            <div className='flex items-center gap-8'>
                {/* --[Main Logo]----------------------------------------------------------- */}
                <img className='cursor-pointer' onClick={() => handleToHome()} src="/Images/Main-Logo/logo-pizza-4-anh-tai.png" alt="Logo" width={45} />
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
                                    <Link to={`/food-category/` + item.categoryId} className='px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-2 items-center'
                                        key={index}>
                                        <img src='/Images/Category-Image/fried-chicken.png' alt='icon'
                                            width={25} />
                                        <h2>{item.categoryName}</h2>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                {/* --[Categories Button - End]--------------------------------------------- */}

                {/* --[Ô tìm kiếm]---------------------------------------------------------- */}
                <SearchInput />
                {/* --[Ô tìm kiếm - End]---------------------------------------------------- */}
            </div>

            {/* Right Navbar */}
            <div className="flex gap-5 items-center">
                {/* --[Cart Icon]----------------------------------------------------------- */}
                <div className='flex gap-2 items-center text-lg' >
                    {breakpoint === "base" ?
                        <Link to={"/cart"} onClick={handleToCart}>
                            <ShoppingBag />
                        </Link>
                        : 
                        <CartBadge />
                    }
                </div>
                {/* --[Cart Icon - End]----------------------------------------------------- */}

                {/* --[Login Signup]-------------------------------------------------------- */}
                <div className="flex gap-2 items-center">
                    {auth?.token ? (
                        <>
                            <DropdownMenu>
                                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                                    <span className='text-sm font-semibold'>
                                        👋 Hi, <span className="text-primary font-bold te">{auth.fullName}</span>
                                    </span>
                                </li>
                                <hr className='border-gray-300 my-1' />
                                <li id='profile' className='px-4 py-2 hover:bg-gray-100 cursor-pointer' >
                                    <Link to={"/profile/general"}>
                                        Profile
                                    </Link>
                                </li>
                                {isAdmin != "Customer" ? (
                                    <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                                        <a href="https://nhom6thu4ca1feadmin.vercel.app/admin?role=admin`">Admin Dashboard</a>
                                    </li>
                                ) : (<></>)}
                                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500 font-bold' onClick={logout}> Logout </li>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Login />
                            <Register />
                        </>
                    )}
                </div>
                {/* --[Login Signup - End]-------------------------------------------------- */}
            </div>
        </div>
    );
};

export default Header;