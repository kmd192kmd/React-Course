import { useEffect, useState } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import './CheckoutPage.css';
import axios from 'axios';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';

export function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    document.title = 'Checkout';
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.rel = 'shortcut icon';
    link.href = '/cart-favicon.png';
    document.head.appendChild(link);

    const fetchCheckoutData = async () => {
      let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOptions(response.data);

      response = axios.get('/api/payment-summary');
      setPaymentSummary(response.data);
      };
    
    fetchCheckoutData();

  }, []);

  return (
    <>
      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}