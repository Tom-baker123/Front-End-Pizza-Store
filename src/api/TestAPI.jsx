import React, { useEffect, useState } from "react";

const TestAPI = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://localhost:44394/api/Category");
        if (!response.ok) {
          throw new Error("Network response was not ok");
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Category List</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.categoryId}>{category.categoryName}</li>
        ))}
      </ul>
    </div>
  );
};

export default TestAPI;