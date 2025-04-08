import { useEffect, useState } from "react";

const CategoryAPIUrl = "https://nhom6thu4sangca1.onrender.com/api/Category";
const ProductAPIUrl = "https://nhom6thu4sangca1.onrender.com/api/Product";
const SizeAPIUrl = "https://nhom6thu4sangca1.onrender.com/api/Size";
const ToppingAPIUrl = "https://nhom6thu4sangca1.onrender.com/api/Topping";
const CartAPIUrl = "https://nhom6thu4sangca1.onrender.com/api/Cart";

// [API CATEGORIES]
export const getCategoriesList = async () => {
    try {
        const response = await fetch(CategoryAPIUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
        if (!response.ok) throw new Error("Không lấy được danh sách danh mục");
        const data = await response.json();
        return data.value?.records || data; // Linh hoạt với cấu trúc dữ liệu trả về
    } catch (error) {
        throw error;
    }
};

// Hook để lấy tất cả danh mục
export const getAllCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategoriesList();
                setCategories(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return { categories, loading, error };
};

// [API PRODUCT]
export const getAllProducts = (pageSize = 10, pageNumber = 1) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    `${ProductAPIUrl}?PageSize=${pageSize}&PageNumber=${pageNumber}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                        },
                    }
                );
                if (!response.ok) throw new Error("Không lấy được dữ liệu sản phẩm");
                const data = await response.json();
                setProducts(data.records || []);
                setTotalRecords(data.totalRecords || 0);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [pageSize, pageNumber]);

    return { products, loading, error, totalRecords };
};

export const getAllProductsByCategory = async (
    pageSize = 10,
    pageNumber = 1,
    categoryId = null
) => {
    try {
        const url = categoryId
            ? `${ProductAPIUrl}?PageSize=${pageSize}&PageNumber=${pageNumber}&CategoryId=${categoryId}`
            : `${ProductAPIUrl}?PageSize=${pageSize}&PageNumber=${pageNumber}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
        if (!response.ok) throw new Error("Không lấy được dữ liệu sản phẩm");
        const data = await response.json();
        return { records: data.records || [], totalRecords: data.totalRecords || 0 };
    } catch (error) {
        return { records: [], totalRecords: 0, error: error.message };
    }
};

// [API SIZE]
export const getAllSize = async () => {
    try {
        const response = await fetch(SizeAPIUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
        if (!response.ok) throw new Error("Không lấy được danh sách kích thước");
        const data = await response.json();
        return data.records || data; // Linh hoạt với cấu trúc trả về
    } catch (error) {
        throw error;
    }
};

// [API CART]
export const getCartItems = async () => {
    try {
        const response = await fetch(CartAPIUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
        if (!response.ok) throw new Error("Không lấy được dữ liệu giỏ hàng");
        const data = await response.json();
        return data.records || data;
    } catch (error) {
        throw error;
    }
};

export const addToCart = async (cartItem) => {
    try {
        const response = await fetch(CartAPIUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(cartItem),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Không thêm được sản phẩm vào giỏ hàng");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const updateCartItem = async (cartItemId, quantity) => {
    try {
        const response = await fetch(`${CartAPIUrl}/${cartItemId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ quantity }),
        });
        if (!response.ok) throw new Error("Không cập nhật được giỏ hàng");
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const removeCartItem = async (cartItemId) => {
    try {
        const response = await fetch(`${CartAPIUrl}/${cartItemId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
        if (!response.ok) throw new Error("Không xóa được sản phẩm khỏi giỏ hàng");
        return true;
    } catch (error) {
        throw error;
    }
};