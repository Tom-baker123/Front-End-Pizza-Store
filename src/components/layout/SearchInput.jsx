import { Search } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function SearchInput() {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [isDropOpen, setIsDropOpen] = useState(false);
    const dropdownRef = useRef(null);
    const debounceTimeout = useRef(null);

    // Đóng dropdown khi click ngoài
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Fetch dữ liệu
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://nhom6thu4sangca1.onrender.com/api/Product");
                const data = await res.json();
                setProducts(data.records);
                setFiltered(data.records);
            } catch (err) {
                console.error("Lỗi khi fetch sản phẩm:", err);
            }
        };
        fetchData();
    }, []);

    // Xử lý search có debounce
    const handleSearch = (e) => {
        const keyword = e.target.value;
        setSearch(keyword);
        setIsDropOpen(true);

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            const results = products.filter((item) =>
                item.name.toLowerCase().includes(keyword.toLowerCase())
            );
            setFiltered(results);
        }, 300);
    };

    // Tô đậm chữ khớp với từ khóa
    const highlightMatch = (text, keyword) => {
        const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === keyword.toLowerCase() ? (
                <span key={index} className="font-bold text-orange-500">{part}</span>
            ) : (
                <span key={index}>{part}</span>
            )
        );
    };

    return (
        <div className="relative w-full sm:w-96" ref={dropdownRef}>
            {/* Ô tìm kiếm */}
            <div className="hidden md:flex items-center gap-2 border-2 border-gray-400 rounded-full px-4 py-2 bg-gray-50 shadow-md">
                <Search className="stroke-gray-500" />
                <input
                    type="text"
                    className="bg-transparent outline-none w-full"
                    placeholder="Find your favorite here 😋"
                    value={search}
                    onChange={handleSearch}
                />
            </div>

            {/* Dropdown kết quả */}
            {isDropOpen && (
                <ul className="absolute z-10 bg-white mt-1 w-full rounded-lg shadow-2xl max-h-60 overflow-y-auto">
                    {filtered.length > 0 ? (
                        filtered.map((item) => (
                            <li
                                key={item.id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                <Link
                                    to={`/food-category/${item.categoryID}`}
                                    onClick={() => {
                                        setSearch(item.name);
                                        setFiltered([item]);
                                        setIsDropOpen(false);
                                    }}
                                >
                                    {highlightMatch(item.name, search)}
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-2 text-gray-500 italic">
                            Không tìm thấy sản phẩm.
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
}
