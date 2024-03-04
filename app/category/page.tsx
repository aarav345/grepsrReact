"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductPieChart from "@/components/ProductPieChart";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6">Product Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link href={`/category/${category}`} key={category}>
            {category}
          </Link>
        ))}
      </div>

      <div className="py-6">
        <ProductPieChart categories={categories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
