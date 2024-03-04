"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";



const ProductDetails = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const productId  = params["slug"];
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  console.log(params["slug"])

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  const fetchProduct = async (productId) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`); // Replace with your API endpoint
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };


  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="relative">
            <Image
              src={product.images[currentImageIndex]}
              alt={product.title}
              layout="responsive"
              width={800}
              height={600}
            />
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-75 focus:outline-none"
              onClick={handlePrevImage}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-75 focus:outline-none"
              onClick={handleNextImage}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-semibold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">Price: ${product.price}</p>
          <p className="text-gray-600 mb-4">Description: {product.description}</p>
          <p className="text-gray-600 mb-4">Rating: {product.rating}</p>
          <p className="text-gray-600 mb-4">Stock: {product.stock}</p>
          <p className="text-gray-600 mb-4">Brand: {product.brand}</p>
          <p className="text-gray-600 mb-4">Category: {product.category}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
