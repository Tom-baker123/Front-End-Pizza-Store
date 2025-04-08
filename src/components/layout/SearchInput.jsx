import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SearchInput() {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://nhom6thu4sangca1.onrender.com/api/Product");
                const data = await res.json();
                console.log("Fetched Products:", data.records);
                setProducts(data.records);
                setFiltered(data.records);
            } catch (err) {
                console.error("Lỗi khi fetch sản phẩm:", err);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (e) => {
        const keyword = e.target.value;
        setSearch(keyword);
        setFiltered(
            products.filter((item) =>
                item.name.toLowerCase().includes(keyword.toLowerCase())
            )
        );
    };

    return (
        <div className="relative">
            {/* Input có dropdown */}
            <div className="shadow-lg hidden sm:flex md:flex border-2 border-gray-400 rounded-4xl p-2 pl-5 bg-gray-50 w-96">
                <input type="text" className='bg-transparent outline-none w-full'
                    placeholder='Find Your favorite here 😋'
                    value={search} onChange={handleSearch} />
                <Search className='stroke-gray-500' />
            </div>

            {search && filtered.length > 0 && (
                <ul className="absolute z-10 bg-white border-white mt-1 w-full rounded shadow max-h-60 overflow-y-auto">
                    {filtered.map((item) => (
                        <li key={item.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            <Link to={`/food-category/${item.categoryID}`}
                                
                                onClick={() => {
                                    console.log(item.categoryID)
                                    setSearch(item.name);
                                    setFiltered([item]);
                                }}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>

    );
}


