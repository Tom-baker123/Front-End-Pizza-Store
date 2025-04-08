import React from "react";
import { getAllSize } from "../../api/GlobalAPI";

const SizeButtonList = ({ onSizeChange }) => {
    const { sizes, loading, error } = getAllSize();

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>Lỗi: {error}</p>;

    return (
        <div>
            <div className="grid grid-cols-3 gap-5">
                {sizes && sizes.length > 0 ? (
                    sizes.map((item) => (
                        <div
                            onClick={() => onSizeChange(item.additionalPrice, item.sizeID)} // Đổi thành sizeID
                            className="flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-200"
                            key={item.sizeID} // Đổi thành sizeID
                        >
                            <h2 className="font-bold text-green-800">{item.name}</h2>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-200">
                        <img
                            src="/Images/Icon/Fail.png"
                            alt="icon"
                            width={50}
                            height={50}
                            className="group-hover:scale-125 transition-all ease-in-out"
                        />
                        <h2 className="text-red-500 font-bold">API FAIL</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SizeButtonList;