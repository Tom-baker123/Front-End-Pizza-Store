import { useEffect, useState } from "react";

const CategoryAPIUrl = "https://localhost:44394/api/Category";
const SizeAPIUrl = "https://localhost:44394/api/Size";
const ToppingAPIUrl = "https://localhost:44394/api/Topping";


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

export const Register = ({ userData }) => {
    const [message, setMessage] = useState("");
  
    useEffect(() => {
      const registerUser = async () => {
        if (!userData) return;
  
        try {
          const res = await fetch("https://localhost:44394/api/Auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });
  
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
  
          setMessage("Đăng ký thành công!");
        } catch (err) {
          setMessage("Đăng ký thất bại!");
        }
      };
  
      registerUser();
    }, [userData]);
  
    return <p>{message}</p>;
};