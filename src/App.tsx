import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { Home } from './pages/Home';
import { ProductDetails } from './pages/ProductDetails';
import { Checkout } from './pages/Checkout';
import { Payment } from './pages/Payment';
import { PaymentCompletion } from './pages/PaymentCompletion';
import { PaymentVerification } from './pages/PaymentVerification';
import { DeliveryInfo } from './pages/DeliveryInfo';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { ExistingOrder } from './pages/ExistingOrder';
import { Policies } from './pages/Policies';
import { BrandProducts } from './pages/BrandProducts';
import { BankInstallment } from './pages/BankInstallment';
import { Contact } from './pages/Contact';
import { Articles } from './pages/Articles';
import { ArticleDetail } from './pages/ArticleDetail';
import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';
import { WindLoader } from './components/WindLoader';

function App() {
  return (
    <CartProvider>
      <Layout>
        <ScrollToTop />
        <Suspense fallback={<WindLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home.html" element={<Home />} />
            <Route path="/dist/" element={<Home />} />
            <Route path="/dist/home.html" element={<Home />} />
            <Route path="/p/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment-completion" element={<PaymentCompletion />} />
            <Route path="/payment-verification/:id" element={<PaymentVerification />} />
            <Route path="/delivery" element={<DeliveryInfo />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/existing-order" element={<ExistingOrder />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/policies/:type" element={<Policies />} />
            <Route path="/brands/:brand" element={<BrandProducts />} />
            <Route path="/installment/bank" element={<BankInstallment />} />
            <Route path="/info/contact" element={<Contact />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
          </Routes>
        </Suspense>
      </Layout>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            fontFamily: 'Noto Sans Arabic, sans-serif',
            direction: 'rtl'
          },
        }}
      />
    </CartProvider>
  );
}

export default App;