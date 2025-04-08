import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Profile = () => {
    const location = useLocation(); // Lấy thông tin URL hiện tại

    return (
        <div className='p-5 md:p-10 px-3 font-primary'>
            <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Sidebar */}
                <div className="col-span-2 md:px-2">
                    <ul className="space-y-1">
                        <li>
                            <Link
                                to="general"
                                className={`block rounded-lg px-4 py-2 text-sm font-medium
                                    ${location.pathname.includes("/profile/general") 
                                        ? "bg-gray-100" 
                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"} `}
                            >
                                General
                            </Link>
                        </li>
                        
                        <li>
                            <Link
                                to="order"
                                className={`block rounded-lg px-4 py-2 text-sm font-medium
                                    ${location.pathname.includes("/profile/order") 
                                        ? "bg-gray-100" 
                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"} `}
                            >
                                Order
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="account"
                                className={`block rounded-lg px-4 py-2 text-sm font-medium
                                    ${location.pathname.includes("/profile/account") 
                                        ? "bg-gray-100" 
                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"} `}
                            >
                                Account
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Nội dung của route con */}
                <div className="col-span-10 md:px-2">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Profile;