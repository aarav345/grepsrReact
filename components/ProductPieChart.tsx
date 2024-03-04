import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

interface ProductPieChartProps {
  categories: string[];
}

const ProductPieChart: React.FC<ProductPieChartProps> = ({ categories }) => {
  const [loading, setLoading] = useState<boolean>(true); 
  const chartRef = useRef<Chart>();

  useEffect(() => {
    fetchDataAndRender();
  }, [categories]);

  const fetchData = async (category: string) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/category/${category}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const fetchDataAndRender = async () => {
    setLoading(true); 
    
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  
    // Rest of the code to render the new chart
    const categoryCounts = {};
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const productData = await fetchData(category);
      if (!productData || !productData.products) continue;
      productData.products.forEach((product) => {
        const category = product.category;
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });
    }
  
    const categoryLabels = Object.keys(categoryCounts);
    const backgroundColor = generateColors(categoryLabels.length);
  
    const ctx = document.getElementById("pieChart") as HTMLCanvasElement;
    chartRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: categoryLabels,
        datasets: [
          {
            label: "Product Distribution by Category",
            data: Object.values(categoryCounts),
            backgroundColor: backgroundColor,
          },
        ],
      },
    });

    setLoading(false); 
  };
  
  

  const generateColors = (count: number) => {
    const dynamicColors = [];
    for (let i = 0; i < count; i++) {
      dynamicColors.push(
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.5)`
      );
    }
    return dynamicColors;
  };

  return (
    <div className="my-6">
      <h2 className="font-semibold">Product Distribution by Category</h2>
      {loading ? (
        <div>Loading...</div> 
      ) : (
        <canvas id="pieChart" width="400" height="400"></canvas>
      )}
    </div>
  );
};

export default ProductPieChart;
