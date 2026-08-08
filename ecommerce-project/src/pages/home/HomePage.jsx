import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header.jsx';
import './HomePage.css';
import { ProductGrid } from './ProductsGrid.jsx';

export function HomePage({cart}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    document.title = 'Ecommerce Project';
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'shortcut icon';
    link.href = '/home-favicon.png';
    document.head.appendChild(link);

    const getHomeData = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
      console.log("성공", response.data);
    };
    
    getHomeData();
  }, []);

  return (
    <>
      <Header cart={cart} />

      <div className="home-page">
        <ProductGrid products={products} />
      </div>
    </>
  );
}