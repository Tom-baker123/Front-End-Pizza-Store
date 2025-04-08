import { useEffect, useState } from "react";

const CategoryAPIUrl = "https://nhom6thu4sangca1.onrender.com/api/Category";
const ProductAPIUrl = "https://nhom6thu4sangca1.onrender.com/api/Product";
const SizeAPIUrl = "https://nhom6thu4sangca1.onrender.com/api/Size";
const ToppingAPIUrl = "https://nhom6thu4sangca1.onrender.com/api/Topping";
const CartAPIUrl = "https://localhost:44394/api/Cart";

// [API CATEGORIES]
export const getCategoriesList = async () => {
    try {
        const response = await fetch(CategoryAPIUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Không lấy được API`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(CategoryAPIUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error("Không lấy được API");
                }
                const data = await response.json();
                setCategories(data.value?.records || []);
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
                            Accept: "application/json",
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Không lấy được dữ liệu sản phẩm");
                }
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

export const getAllProductsByCategory = async (pageSize = 10, pageNumber = 1, categoryId = null) => {
    try {
        const response = await fetch(`${ProductAPIUrl}?PageSize=${pageSize}&PageNumber=${pageNumber}`);
        if (!response.ok) throw new Error("Không lấy được dữ liệu sản phẩm");
        const data = await response.json();

        const filterCategory = data.records.filter(p => p.categoryId === parseInt(categoryId));
        return { records: filterCategory || [], totalRecords: data.totalRecords || 0, error: null };
    } catch (error) {
        return { records: [], totalRecords: 0, error: error.message };
    }
};

// [API SIZE]
export const getAllSize = () => {
    const [size, setSize] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSize = async () => {
            try {
                const response = await fetch(SizeAPIUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error("Không lấy được API");
                }
                const data = await response.json();
                setSize(data.records || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSize();
    }, []);

    return { size, loading, error };
};

// [API TOPPING]
export const getAllTopping = () => {
    const [topping, setTopping] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopping = async () => {
            try {
                const response = await fetch(ToppingAPIUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error("Không lấy được API");
                }
                const data = await response.json();
                setTopping(data.records || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTopping();
    }, []);

    return { topping, loading, error };
};

// [API PROMOTION]
export const getPromotion = () => {
    const [promotion, setPromotion] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPromotion = async () => {
            try {
                const response = await fetch(ToppingAPIUrl, { // Giả định đây là lỗi copy-paste, cần thay bằng PromotionAPIUrl nếu có
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error("Không lấy được API");
                }
                const data = await response.json();
                setPromotion(data.records || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPromotion();
    }, []);

    return { promotion, loading, error };
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
        if (!response.ok) {
            throw new Error("Không lấy được dữ liệu giỏ hàng");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
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
            throw new Error("Không thêm được sản phẩm vào giỏ hàng");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
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
        if (!response.ok) {
            throw new Error("Không cập nhật được giỏ hàng");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
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
        if (!response.ok) {
            throw new Error("Không xóa được sản phẩm khỏi giỏ hàng");
        }
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
};