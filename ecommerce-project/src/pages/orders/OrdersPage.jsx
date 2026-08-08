import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import './OrdersPage.css';
import axios from 'axios';
import { OrdersGrid } from './OrdersGrid';

export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    document.title = 'Orders';
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.rel = 'shortcut icon';
    link.href = '/orders-favicon.png';
    document.head.appendChild(link);
    
    const fetchOrdersData = async () => {
      const response = await axios.get('/api/orders?expand=products');
      setOrders(response.data);
    };

    fetchOrdersData();
  }, []);

  return (
    <>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} />
      </div>
    </>
  );
}