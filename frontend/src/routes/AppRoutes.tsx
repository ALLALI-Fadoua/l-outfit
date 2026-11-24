import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Shop from '../pages/Shop/Shop'
import ProductDetails from '../pages/Shop/ProductDetails'
import Wishlist from '../pages/Wishlist/Wishlist'
import Checkout from '../pages/Checkout/Checkout'
import NotFound from '../pages/NotFound/NotFound'
import AdminLogin from '../pages/Auth/AdminLogin'
import AdminLayout from '../pages/Admin/AdminLayout'
import Dashboard from '../pages/Admin/Dashboard'
import ManageProducts from '../pages/Admin/ManageProducts'
import ManageOrders from '../pages/Admin/ManageOrders'
import ProductForm from '../pages/Admin/ProductForm'
import ProductDetail from '../pages/Admin/ProductDetail'
import AdminRoute from './AdminRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/category/:slug" element={<Shop />} />
      <Route path="/sale" element={<Shop saleOnly />} />
      <Route path="/collections/:slug" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<Checkout />} />
      {/* admin only — customers have no account */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id/edit" element={<ProductForm />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="orders" element={<ManageOrders />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
