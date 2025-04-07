import { useEffect, useState } from "react";

const CategoryAPIUrl = "https://nhom6thu4sangca1.onrender.com/api/Category";
const ProductAPIUrl = "https://nhom6thu4sangca1.onrender.com/api/Product";

const ProductAPIUrlLocal = "https://localhost:44394/api/Product";

const SizeAPIUrl = "https://nhom6thu4sangca1.onrender.com/api/Size";
const ToppingAPIUrl = "https://nhom6thu4sangca1.onrender.com/api/Topping";


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

    const apiUrlChange = pageSize == "" || pageNumber == "" ? `${ProductAPIUrl}` : `${ProductAPIUrl}?PageSize=${pageSize}&PageNumber=${pageNumber}`;

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


{/* --[API CART]------------------------------------------------------------ */ }

