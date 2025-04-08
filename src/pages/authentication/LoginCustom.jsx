import React, { useState } from 'react'
import ModalMUICustom from '../../components/common/Mui-Components/ModalMUICustom'
import toast from 'react-hot-toast';
// Xử lý form đăng nhập
import { useForm } from 'react-hook-form';
import { loginUser } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginCustom = () => {
  const { register, handleSubmit, reset } = useForm(); // Thuộc tính của react-hook-form
  const { login } = useAuth(); // Lấy hàm login từ AuthContext cho localStorage
  const navigate = useNavigate(); // Dùng để điều hướng đến trang khác
  const [open, setOpen] = useState(false); // Đặt mặc đinh cho modal là đóng

  const onSubmit = async (data) => {
    const res = await loginUser(data); // Gọi hàm loginUser từ API 
    if (res.success) {
      console.log(res); // In ra kết quả trả về từ API
      login(res);
      toast.success("Login successful! ✅"); // Hiển thị thông báo thành công
      reset(); // Reset lại form

      navigate("/"); // Điều hướng về trang chủ
      setOpen(false); // Đóng modal
    } else {
      toast.error("Input field Invalid! 😥"); // Hiển thị thông báo lỗi
    }
  };
  return (
    <>
      <ModalMUICustom
        nameButton={"Login"} variant={"outlined"}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <div className="overflow-hidden flex min-h-full flex-col justify-center px-6  lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-16 w-auto" src="/Images/Main-Logo/logo-pizza-4-anh-tai.png" alt="Your Company" />
            <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            {/* --[FORM]------------------------------------------------------------- */}
            <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm/6 font-medium text-gray-900">Email address</label>
                <div className="mt-2">
                  {/* IMNPUT EMAIL */}
                  <input {...register('email')} type="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-greetext-green-600 sm:text-sm/6" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm/6 font-medium text-gray-900">Password</label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-green-600 hover:text-primary">Forgot password?</a>
                  </div>
                </div>
                <div className="mt-2">
                  {/* IMNPUT PASSWORD */}
                  <input {...register('password')} type="password" name="password" id="password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-greetext-green-600 sm:text-sm/6" />
                </div>
              </div>

              <div>
                {/* BUTTON SUBMIT */}
                <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-greetext-green-600">
                  Sign in
                </button>
              </div>
            </form>
            {/* --[FORM - END-------------------------------------------------------- */}

            <p className="mt-5 text-center text-sm/6 text-gray-500">
              Not a member?
              <a href="#" className="font-semibold text-green-600 hover:text-primary">Start a 14 day free trial</a>
            </p>
          </div>
        </div>
      </ModalMUICustom>
    </>
  )
}

export default LoginCustom