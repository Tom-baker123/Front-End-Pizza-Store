import React from 'react';
import { useCart } from '../context/CartContext';
import { getOrder, postOrder, postPayment } from '../api/GlobalAPI';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import FormCheckout from '../components/layout/FormCheckout';
import { useForm } from 'react-hook-form';

const Cart = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    // Phân quyền
    const { auth } = useAuth();
    const Token = auth?.token;
    const userID = localStorage.getItem("userID");

    const navigate = useNavigate();

    // Tính toán tổng tiền
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const vat = subtotal * 0.1; // Ví dụ VAT 10%
    const discount = 0; // Có thể thêm logic giảm giá sau
    const total = subtotal + vat - discount;
    // Lấy ngày hiện tại
    const currentDate = new Date().toISOString();

    const handleCheckout = async (data) => {
        // if (!Token) {
        //     toast.error("You need to Login first");
        //     navigate("/cart");
        //     return;
        // }
        localStorage.setItem("checkoutInfo", JSON.stringify(data))// Lưu checkout info
        toast.success("✅ You have saved your order info!");

        try {
            const data = {
                userID: userID ? userID : null,
                totalAmount: total,
                status: "pending",
                orderDate: currentDate,
                voucherID: 1,
            };
            const res = await postOrder(data);
            toast.success("Redirecting To Payment Page");

            const id = res.orderID;
            const paymentUrl = await postPayment(id);
            const RemoveAllProductFromCart = localStorage.removeItem("cartItems");
            console.log(RemoveAllProductFromCart);
            window.location.href = String(paymentUrl);
        } catch (err) {
            console.error("Error details:", err);
            toast.error(err.message || "Failed to add to cart");
        }
    };


    return (
        <section>
            <div className="p-5 md:p-10 px-3 font-primary">
                <header className="text-center">
                    <h1 className="text-primary text-5xl font-bold sm:text-3xl">Your Cart</h1>
                </header>

                <div className="mt-5">
                    {cartItems.length === 0 ? (
                        <p className="text-center text-gray-500">Your cart is empty.</p>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map((item, index) => (
                                <li key={index} className="flex items-center gap-4">
                                    <img
                                        src={item.imageURL}
                                        alt={item.name}
                                        className="size-16 rounded-sm object-cover"
                                    />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                                        <dl className="mt-0.5 space-y-px text-sm text-gray-600">
                                            <div>
                                                <dt className="inline">Size:</dt>
                                                <dd className="inline">{item.size}</dd>
                                            </div>
                                            <div>
                                                <dt className="inline">Price:</dt>
                                                <dd className="inline">{item.price} VND</dd>
                                            </div>
                                        </dl>
                                    </div>

                                    <div className="flex flex-1 items-center justify-end gap-2">
                                        <input
                                            type="number" min="1" value={item.quantity}
                                            onChange={(e) =>
                                                updateQuantity(item.productID, item.size, parseInt(e.target.value))
                                            }
                                            className="h-8 w-12 rounded-sm border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600"
                                        />
                                        <button
                                            onClick={() => removeFromCart(item.productID, item.size)}
                                            className="text-gray-600 transition hover:text-red-600"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4"
                                            >
                                                <path
                                                    strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    {cartItems.length > 0 && (
                        <div className="mt-5 flex flex-col gap-5 border-t border-gray-100 pt-5
                            md:grid md:grid-cols-2 md:gap-2
                        ">
                            {!Token ? (<>

                                <div>
                                    <FormCheckout register={register} errors={errors} />
                                </div>

                                <div className="px-5">
                                    <div className="space-y-0.5 text-md text-gray-700">
                                        <div className="flex justify-between">
                                            <dt>Subtotal</dt>
                                            <dd>{subtotal.toFixed(0)} VND</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt>VAT</dt>
                                            <dd>{vat.toFixed(0)} VND</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt>Discount</dt>
                                            <dd>{discount.toFixed(0)} VND</dd>
                                        </div>
                                        <div className="flex justify-between !text-base font-medium">
                                            <dt>Total</dt>
                                            <dd>{total.toFixed(0)} VND</dd>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button onClick={handleSubmit(handleCheckout)}
                                            className="block rounded-sm bg-gray-700 px-5 py-3 text-md text-gray-100 transition hover:bg-gray-600"
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                </div>
                            </>) : (<>
                                <div className="bg-gray-100 p-5 rounded-md">
                                    <h2 className="text-2xl font-bold text-green-700">You're already logged in!</h2>
                                    <p className="text-gray-700 mt-2">No need to fill out the form.</p>
                                </div>
                                <div className="px-5">
                                    <div className="space-y-0.5 text-md text-gray-700">
                                        <div className="flex justify-between">
                                            <dt>Subtotal</dt>
                                            <dd>{subtotal.toFixed(0)} VND</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt>VAT</dt>
                                            <dd>{vat.toFixed(0)} VND</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt>Discount</dt>
                                            <dd>{discount.toFixed(0)} VND</dd>
                                        </div>
                                        <div className="flex justify-between !text-base font-medium">
                                            <dt>Total</dt>
                                            <dd>{total.toFixed(0)} VND</dd>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button onClick={() => handleCheckout(
                                            {
                                                FullName: "FromToken",
                                                Phone: "0000000000",
                                                Address: "FromToken",
                                            }
                                        )}
                                            className="mt-3  block rounded-sm bg-gray-700 px-5 py-3 text-md text-gray-100 transition hover:bg-gray-600"
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                </div>
                            </>)}
                        </div>
                    )}
                </div>
            </div>

        </section>
    );
};

export default Cart;