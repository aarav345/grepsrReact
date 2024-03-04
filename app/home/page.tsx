"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [userEmail, setUserEmail] = useState("");



  useEffect(() => {
    fetchData(page, itemsPerPage);
    const email = localStorage.getItem("email");
    setUserEmail(email);
  }, [page, itemsPerPage]);

  const fetchData = async (currentPage, limit) => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${(currentPage - 1) * limit}`
    );
    const data = await response.json();
    setProducts(data.products);
    setTotalPages(Math.ceil(data.total / limit));
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="bg-zinc-900 min-h-screen">
      <div className="container py-10">
      <div className="my-10 text-center text-white text-3xl font-bold">{userEmail && `Welcome, ${userEmail}`}</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded shadow-md transition-transform hover:scale-105 hover:transition duration-300">
              <Link href={`/product-details/${product.id}`}>
             
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-64 object-cover rounded-t"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{product.title}</h2>
                    <p className="text-gray-600">${product.price}</p>
                    <p className="text-gray-600">{product.description}</p>
                  </div>
              
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`mx-1 px-3 py-2 ${
                pageNumber === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded-md hover:bg-blue-500 hover:text-white`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div className="mt-6 flex justify-center">
          <Link href="/category">

            <button className=" bg-white text-zinc-900 px-4 py-4 rounded-md transition-transform hover:scale-105 hover:transition duration-300">Browse Categories</button>
            
              
            
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
