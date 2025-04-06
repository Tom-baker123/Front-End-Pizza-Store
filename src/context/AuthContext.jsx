// Toàn bộ logic login/logout + lưu token Lưu tại đây
import React, {  createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'), // Lấy token từ localStorage
        role: localStorage.getItem('role'), // Lấy role từ localStorage
        fullName: localStorage.getItem('fullName'), // Lấy fullName từ localStorage
    }); // Lưu trạng thái auth

    // Khi đăng nhập thành công thì lưu token vào localStorage
    const login = (data) => {
        localStorage.setItem('token', data.token); // Lưu token vào localStorage
        localStorage.setItem('role', data.role); // Lưu role vào localStorage
        localStorage.setItem('fullName', data.fullName); // Lưu fullName vào localStorage
        setAuth({ token: data.token, role: data.role, fullName: data.fullName }); // Lưu trạng thái auth từ data
    };

    // Khi logout thì xóa token khỏi localStorage
    const logout = (token) => {
        localStorage.clear(); // Xóa token khỏi localStorage
        setAuth({ token: null, role: null, fullName: null }); // Xóa trạng thái auth
    };

    return(
        <AuthContext.Provider value={{auth, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

// Đây là 1 custom hook giúp sử dụng AuthContext dễ dàng hơn
export const useAuth = () => useContext(AuthContext); // Trả về giá trị của AuthContext