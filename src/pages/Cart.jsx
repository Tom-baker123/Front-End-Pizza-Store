import React, { useState, useEffect, useCallback } from "react";
import { getCartItems, updateCartItem, removeCartItem, getAllSize } from "@api/GlobalAPI";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCartItems = useCallback(async () => {
        try {
            setLoading(true);
            const [cartData, sizeData] = await Promise.all([getCartItems(), getAllSize()]);
            setCartItems(cartData);
            setSizes(sizeData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCartItems();
    }, [fetchCartItems]);

    const handleUpdateQuantity = async (cartItemId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            await updateCartItem(cartItemId, newQuantity);
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === cartItemId ? { ...item, quantity: newQuantity } : item
                )
            );
        } catch (error) {
            alert("Cập nhật số lượng thất bại!");
        }
    };

    const handleRemoveItem = async (cartItemId) => {
        try {
            await removeCartItem(cartItemId);
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== cartItemId));
        } catch (error) {
            alert("Xóa sản phẩm thất bại!");
        }
    };

    const getSizeName = (sizeID) => {
        const size = sizes.find((s) => s.sizeID === sizeID);
        return size ? size.name : "N/A";
    };

    const calculateTotal = () => {
        return cartItems.reduce(
            (total, item) => total + (item.price || item.productPrice) * item.quantity,
            0
        );
    };

    if (loading) return <p>Đang tải giỏ hàng...</p>;
    if (error) return <p>Lỗi: {error}</p>;

    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <header className="text-center">
                        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
                    </header>

                    <div className="mt-8">
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <li key={item.id} className="flex items-center gap-4">
                                    <img
                                        src={item.imageURL || item.product?.imageURL}
                                        alt={item.name || item.product?.name}
                                        className="size-16 rounded-sm object-cover"
                                    />
                                    <div>
                                        <h3 className="text-sm text-gray-900">
                                            {item.name || item.product?.name}
                                        </h3>
                                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                            <div>
                                                <dt className="inline">Size:</dt>
                                                <dd className="inline">{getSizeName(item.sizeID)}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                    <div className="flex flex-1 items-center justify-end gap-2">
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            className="h-8 w-12 rounded-sm border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600"
                                            onChange={(e) =>
                                                handleUpdateQuantity(
                                                    item.id,
                                                    parseInt(e.target.value)
                                                )
                                            }
                                        />
                                        <button
                                            className="text-gray-600 transition hover:text-red-600"
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="size-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                            <div className="w-screen max-w-lg space-y-4">
                                <dl className="space-y-0.5 text-sm text-gray-700">
                                    <div className="flex justify-between">
                                        <dt>Subtotal</dt>
                                        <dd>{calculateTotal()} VND</dd>
                                    </div>
                                    <div className="flex justify-between !text-base font-medium">
                                        <dt>Total</dt>
                                        <dd>{calculateTotal()} VND</dd>
                                    </div>
                                </dl>
                                <div className="flex justify-end">
                                    <a
                                        href="#"
                                        className="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                                    >
                                        Checkout
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;