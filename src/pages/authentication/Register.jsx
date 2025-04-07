import React, { useState } from 'react';
import ModalMUICustom from '../../components/common/Mui-Components/ModalMUICustom';
import toast, { Toaster } from 'react-hot-toast'; // Ensure Toaster is imported
import { useForm } from 'react-hook-form';
import { registerUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import Verified from './Verified';

const Register = () => {
    const { register, handleSubmit, reset } = useForm(); // Thuộc tính của react-hook-form
    const [loading, setLoading] = useState(false); // Add loading state
    const [open, setOpen] = useState(false); // Đặt mặc đinh cho modal là đóng
    const navigate = useNavigate(); // Dùng để điều hướng đến trang khác

    const onSubmit = async (data) => {
        
        
        if (data.password != data.confirmPassword) {
            toast.error("Password and Confirm Password do not match! 😥"); // Hiển thị thông báo lỗi khi ko trùng mật khẩu
            return;
        }
        setLoading(true); // Loaing khi nhấn nút submit
        try {
            const res = await registerUser(data); // Gọi hàm registerUser từ API
            if (res.success) {
                toast(
                    "Register successful! ✅\n Please check your email to verify your account.📧",
                    { duration: 6000, }
                ); // Hiển thị thông báo thành công
                reset(); // Reset lại form
            } else {
                toast.error("Input field Invalid! 😥"); // Hiển thị thông báo lỗi
            }
            reset(); // Reset lại form
            // navigate("/verified"); // Điều hướng đến trang xác minh tài khoản
            navigate("/"); // Điều hướng đến trang chính sau khi đăng ký thành công
            setOpen(false); // Đóng modal
        } catch (error) {
            toast.error("An error occurred! 😥"); // Hiển thị thông báo lỗi
        } finally {
            setLoading(false); // Set loading to false after the request is completed
        }
    };



    return (
        <>
            <Toaster position="top-right" reverseOrder={false} /> {/* Add Toaster */}
            <ModalMUICustom
                nameButton={"Register"} variant={"contained"}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
            >
                <div className="overflow-hidden flex min-h-full flex-col justify-center sm:px-6 md:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-16 w-auto" src="/Images/Main-Logo/logo-pizza-4-anh-tai.png" alt="Your Company" />
                        <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Register An Account</h2>
                    </div>

                    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className="block text-sm/6 font-medium text-gray-900">Full  Name</label>
                                <div className="mt-2">
                                    {/* INPUT */}
                                    <input {...register('fullName')} type="text" name="fullName" id="fullName" placeholder="Full Name" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-greetext-green-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm/6 font-medium text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input {...register('email')} type="email" placeholder="Email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-greetext-green-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm/6 font-medium text-gray-900">Address</label>
                                <div className="mt-2">
                                    <input {...register('address')} type="text" placeholder="Address" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-greetext-green-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm/6 font-medium text-gray-900">Phone Number</label>
                                <div className="mt-2">
                                    <input {...register('phone')} type="text" placeholder="Phone Number" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-greetext-green-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm/6 font-medium text-gray-900">Password</label>
                                <div className="mt-2">
                                    <input {...register('password')} type="password" placeholder="Password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-greetext-green-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
                                <div className="mt-2">
                                    <input {...register('confirmPassword')} type="password" placeholder="Confirm Password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-greetext-green-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-greetext-green-600"
                                    disabled={loading} // Disable button when loading
                                >
                                    <span className="flashing-text">{loading ? "Loading..." : "Sign Up"}</span> {/* Apply flashing effect */}
                                </button>
                            </div>
                        </form>

                        <p className="mt-5 text-center text-sm/6 text-gray-500">
                            Not a member?
                            <a href='#' className="font-semibold text-green-600 hover:text-primary"> Get start your first order😎</a>
                        </p>
                    </div>
                </div>
            </ModalMUICustom>
        </>
    );
};

export default Register;

