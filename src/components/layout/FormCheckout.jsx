import React from 'react'
import { useForm } from 'react-hook-form'

const FormCheckout = ({onSubmit}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    // const onSubmit = (data) => { console.log("Your data: ", data); }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='border-2 rounded-sm border-gray-500 px-5 py-2'>
            <h2 className='text-3xl font-bold text-center mb-3'>Order Details</h2>

            <div className="grid grid-cols-2 gap-5">
                {/* Ô nhập họ tên */}
                <div className='mb-3'>
                    <label htmlFor="" className='block mb-1 text-lg font-bold'>Full Name</label>
                    <input type="text" className='w-full rounded-sm px-2 py-1 border-gray-300 border-2'
                        {...register("FullName", { required: "Please fill your full name" })} placeholder='Your Full Name'
                    />
                    {errors.FullName && <p className='text-red-500 text-sm'>{errors.FullName.message}</p>}
                </div>

                {/* Số điện thoại */}
                <div className='mb-3'>
                    <label htmlFor="" className='block mb-1 text-lg font-bold'>Phone Number</label>
                    <input type="tel" className='w-full rounded-sm px-2 py-1 border-gray-300 border-2'
                        {...register("Phone", {
                            required: "Please fill your phone number",
                            pattern: {
                                value: /^0\d{9}$/, // ràng buộc số điện thoại là số từ 0-9
                                message: "Your phone number is invalid. Please check it again"
                            }

                        })} maxLength={10}
                        placeholder='Phone Number'
                    />
                    {errors.Phone && <p className='text-red-500 text-sm'>{errors.Phone.message}</p>}
                </div>
            </div>
            {/* Địa chỉ */}
            <div className='mb-5'>
                <label htmlFor="" className='block mb-1 text-lg font-bold'>Address</label>
                <input type="text" className='w-full rounded-sm px-2 py-1 border-gray-300 border-2'
                    {...register("Address", { required: "Please fill your Address" })} placeholder='Your Full Name'
                />
                {errors.Address && <p className='text-red-500 text-sm'>{errors.Address.message}</p>}
            </div>
        </form>
    )
}

export default FormCheckout