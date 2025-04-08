import React, { useState, useEffect } from "react";
import { addToCart, getAllSize } from "@api/GlobalAPI";

const FoodItemDetail = ({ food }) => {
    const [foodTotalPrice, setFoodTotalPrice] = useState(food.price || 0);
    const [quantity, setQuantity] = useState(1);
    const [selectedSizeID, setSelectedSizeID] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSizes = async () => {
            try {
                const data = await getAllSize();
                setSizes(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSizes();
    }, []);

    const handleSizeChange = (additionalPrice, sizeID) => {
        setFoodTotalPrice(food.price + (additionalPrice || 0));
        setSelectedSizeID(sizeID);
    };

    const handleAddToCart = async () => {
        if (!food.id) {
            alert("Không tìm thấy ID sản phẩm!");
            return;
        }
        if (!selectedSizeID) {
            alert("Vui lòng chọn kích thước trước khi thêm vào giỏ hàng!");
            return;
        }

        const cartItem = {
            productId: food.id,
            quantity: quantity,
            sizeID: selectedSizeID,
        };

        try {
            const response = await addToCart(cartItem);
            alert("Đã thêm vào giỏ hàng thành công!");
            setQuantity(1);
            setSelectedSizeID(null);
            setFoodTotalPrice(food.price);
        } catch (error) {
            alert(`Có lỗi xảy ra khi thêm vào giỏ hàng: ${error.message}`);
        }
    };

    if (loading) return <p>Đang tải kích thước...</p>;
    if (error) return <p>Lỗi: {error}</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 px-7 bg-white text-black">
            <img
                src={food.imageURL}
                alt={food.name}
                width={300}
                height={300}
                className="mx-auto p-5 sm:h-[350px] w-[320px] bg-slate-200 object-contain rounded-md md:sticky md:top-0"
            />
            <div className="flex flex-col gap-3 mt-3 sm:mt-0">
                <h2 className="text-2xl font-bold">{food.name}</h2>
                <h2 className="text-sm font-bold text-gray-500">{food.description}</h2>
                <div className="flex gap-3 text-2xl items-center">
                    <h2 className="font-bold">{foodTotalPrice} VND</h2>
                    {foodTotalPrice !== food.price && (
                        <h2 className="line-through text-sm text-gray-500">{food.price} VND</h2>
                    )}
                </div>

                <h2 className="font-bold">Size</h2>
                <div className="flex gap-2">
                    {sizes.map((size) => (
                        <button
                            key={size.sizeID}
                            className={`p-2 border rounded-md ${
                                selectedSizeID === size.sizeID ? "bg-blue-500 text-white" : ""
                            }`}
                            onClick={() => handleSizeChange(size.additionalPrice, size.sizeID)}
                        >
                            {size.name} (+{size.additionalPrice || 0} VND)
                        </button>
                    ))}
                </div>
                <hr />

                <div className="flex items-center gap-2 justify-between">
                    <div className="p-2 border flex gap-10 items-center rounded-md font-bold px-8">
                        <button
                            className="cursor-pointer"
                            disabled={quantity === 1}
                            onClick={() => setQuantity(quantity - 1)}
                        >
                            -
                        </button>
                        <h2>{quantity}</h2>
                        <button
                            className="cursor-pointer"
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </div>
                <h2>{(quantity * foodTotalPrice).toFixed(0)} VND</h2>
            </div>
        </div>
    );
};

export default FoodItemDetail;