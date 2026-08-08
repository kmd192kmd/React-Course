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

    axios.get("/api/products")
      .then((response) => {
        setProducts(response.data);
        console.log("성공", response.data);
      })
      .catch((err) => {
        console.log("실패", err);
      });

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