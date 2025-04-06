import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const Verified = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const res = await fetch(`https://nhom6thu4sangca1.onrender.com/api/auth/activate?token=${token}`);
        const data = await res.json();
        if (res.ok && data.success) {
          toast.success("Xác minh tài khoản thành công. Hãy đăng nhập!");
          navigate("/login");
        } else {
          toast.error(data.message || "Xác minh thất bại!");
        }
      } catch (error) {
        toast.error("Lỗi khi xác minh tài khoản!");
      }
    };

    if (token) {
      // Chạy verifyAccount sau 3 giây
      const timer = setTimeout(() => {
        verifyAccount();
      }, 3000);

      // Dọn dẹp timeout nếu component bị unmount
      return () => clearTimeout(timer);
    }
  }, [token, navigate]);

  return (
    <div>Verifying...</div>
  );
};

export default Verified;