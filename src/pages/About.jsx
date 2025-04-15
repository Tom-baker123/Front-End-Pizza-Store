import { useEffect, useState } from 'react';

const PAGE_SIZE = 10  ;

const About = () => {
  const [foods, setFoods] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // 🟢 Gọi 1 lần để lấy totalRecords
  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await fetch(`https://nhom6thu4sangca1.onrender.com/api/Product`);
        const data = await res.json();
        setTotalRecords(data.totalRecords);
      } catch (error) {
        console.error('Lỗi lấy tổng số sản phẩm:', error);
      }
    };

    fetchTotal();
  }, []);

  // 🟢 Gọi lại mỗi khi đổi trang để lấy dữ liệu trang đó
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch(
          `https://nhom6thu4sangca1.onrender.com/api/Product?PageSize=${PAGE_SIZE}&PageNumber=${pageNumber}`
        );
        const data = await res.json();
        setFoods(data.records);
      } catch (error) {
        console.error('Lỗi fetch dữ liệu:', error);
      }
    };

    fetchFoods();
  }, [pageNumber]);

  const totalPages = Math.ceil(totalRecords / PAGE_SIZE);

  const handleChangePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNumber(newPage);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Danh sách món ăn</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {foods.map((food) => (
          <div key={food.id} className="border p-4 rounded shadow hover:shadow-lg transition">
            <img src={food.imageURL} alt={food.name} className="w-full h-40 object-cover rounded mb-2" />
            <h2 className="font-semibold text-lg">{food.name}</h2>
            <p className="text-sm text-gray-500 mb-1">{food.description}</p>
            <p className="font-bold text-red-500">{food.price.toLocaleString()} VNĐ</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => handleChangePage(pageNumber - 1)}
          disabled={pageNumber === 1}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          «
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => handleChangePage(num)}
            className={`px-3 py-1 rounded ${
              num === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleChangePage(pageNumber + 1)}
          disabled={pageNumber === totalPages}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default About;
