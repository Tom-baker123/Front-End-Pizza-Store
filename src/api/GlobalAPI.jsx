import { useEffect, useState } from "react";

const CategoryAPIUrl = "https://nhom6thu4sangca1.onrender.com/api/Category";
const ProductAPIUrl  = "https://nhom6thu4sangca1.onrender.com/api/Product";
const SizeAPIUrl     = "https://nhom6thu4sangca1.onrender.com/api/Size";
const ToppingAPIUrl  = "https://nhom6thu4sangca1.onrender.com/api/Topping";
const promotionAPI   = "https://nhom6thu4sangca1.onrender.com/api/promotion"
const cartAPI        = "https://nhom6thu4sangca1.onrender.com/api/Cart";
const orderAPI       = "https://nhom6thu4sangca1.onrender.com/api/Orders";
const paymentAPI     = "https://nhom6thu4sangca1.onrender.com/api/Payment"
const AuthenticationAPI = "https://nhom6thu4sangca1.onrender.com/api/Auth"; // /login /register
// const UserAPi            = "https://localhost:44394/api/Auth/users";
// const ProductAPIUrlLocal = "https://localhost:44394/api/Product";


// --[ API Đăng ký tài khoản ]-------------------------------------------------------- */}
export const registerUser = async (data) => {
    const res = await fetch(`${AuthenticationAPI}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    return await res.json();
};

// --[API Login]-------------------------------------------------------- */}
export const loginUser = async (payload) => {
    const res = await fetch(`${AuthenticationAPI}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    return await res.json();
};


// --[API resendActivation]-------------------------------------------------------- */}
export const resendActivation = async (email) => {
    const res = await fetch(`${AuthenticationAPI}/resend-activation?email=${email}`);
    return await res.json();
};


{/* --[API CATEGORIES]------------------------------------------------------ */ }
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
}
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
export const getCategoryById = (categoryId) => {
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!categoryId) return;

        const fetchCategory = async () => {
            try {
                const response = await fetch(`${CategoryAPIUrl}/${categoryId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Không lấy được API");
                }

                const data = await response.json();
                setCategory(data.value); // 🔥 Sửa chỗ này
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [categoryId]);

    return { category, loading, error };
};


{/* --[API PRODUCT]--------------------------------------------------------- */ }
export const getAllProducts = (pageSize, pageNumber = 1) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalRecords, setTotalRecords] = useState(0);

    const apiUrlChange = pageSize == "" ? `${ProductAPIUrl}` : `${ProductAPIUrl}?PageSize=${pageSize}&PageNumber=${pageNumber}`;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    apiUrlChange, // API phân trang
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
    }, [pageSize, pageNumber]); // Thêm pageSize và pageNumber vào dependency array

    return { products, loading, error, totalRecords };
};
export const getAllProductsByCategory = (pageSize = 5, pageNumber = 1, categoryId) => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${ProductAPIUrl}/category/${categoryId}?PageSize=${pageSize}&PageNumber=${pageNumber}`, // API phân trang
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Không lấy được dữ liệu sản phẩm");
                }
                const data = await response.json();
                setProduct(data.records || []);
                setTotalRecords(data.totalRecords || 0);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId, pageSize, pageNumber]); // Thêm pageSize và pageNumber vào dependency array

    return { product, loading, error, totalRecords };
};



{/* --[API SIZE]------------------------------------------------------------ */ }
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


{/* --[API TOPPING]--------------------------------------------------------- */ }
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
}; // Để chơi chưa làm xong


{/* --[API PROMOTION]------------------------------------------------------- */ }
export const getPromotion = () => {
    const [promotion, setPromotion] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopping = async () => {
            try {
                const response = await fetch(promotionAPI, {
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
        fetchTopping();
    }, []);

    return { promotion, loading, error };
};


{/* --[API CART]------------------------------------------------------------ */ }
export const postCart = async (data) => {
    // const Token = localStorage.getItem("token")
    
    const res = await fetch(`${cartAPI}`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await res.json()

    if(!res.ok){
        throw Error(result.message || "Can't add to your cart");
    }

    return result;
};


{/* --[API ORDER]----------------------------------------------------------- */ }
export const postOrder = async (data) => {
    const res = await fetch(`${orderAPI}`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await res.json()

    if(!res.ok){
        throw Error(result.message || "Can't add to your cart");
    }

    return result;
};
export const getOrder = () => {
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopping = async () => {
            try {
                const response = await fetch(orderAPI, {
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
                setOrder(data.records || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTopping();
    }, []);

    return { order, loading, error };
};


{/* --[API PAYMENT]--------------------------------------------------------- */ }
export const postPayment = async (orderId) => {
    const res = await fetch(`${paymentAPI}?orderId=${orderId}`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
    });

    const result = await res.text()

    if(!res.ok){
        throw Error(result.message || "Can't add to your cart");
    }

    return result;
};



