"use client"


import { useEffect, useState } from "react";
import Link from "next/link";

const CategoryPage = ({ params }: { params: { slug: string } }) => {
  const [products, setProducts] = useState([]);

  console.log(params);

  const category = params["slug"];

  useEffect(() => {
    if (category) {
      fetchProductsByCategory(category);
    }
  }, [category]);

  const fetchProductsByCategory = async (category) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/category/${category}`);
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6">Products in Category: {category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded shadow-md">
            <Link href={`/product-details/${product.id}`}>
            <img src={product.thumbnail} alt={product.title} className="w-full h-64 object-cover rounded-t" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600">${product.price}</p>
              <p className="text-gray-600">{product.description}</p>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
