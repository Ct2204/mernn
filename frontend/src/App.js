import './App.css';
import React from 'react';
import WebFont from 'webfontloader'
import {BrowserRouter as Router,Routes, Route } from 'react-router-dom'

import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer.js'
import Home from './component/Home/Home.js'; 
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products.js';
import Search from './component/Product/Search/Search.js';
import LoginSignUp from './component/User/LoginSignUp/LoginSignUp.js';
import store from './store.js'
import { loadUser } from './actions/userAction.js';
import UserOptions from './component/layout/Header/UserOptions.js';
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile/Profile.js';
import ProtectedRoute from './component/Route/ProtectedRoute.js';
import UpdateProfile from './component/User/UpdateProfile/UpdateProfile.js';
import UpdatePassword from './component/User/UpdatePassword/UpdatePassword.js';
import Cart from './component/Product/Cart/Cart.js';
import Shipping from './component/Product/Cart/Shipping/Shipping.js'
import ConfirmOrder from './component/Product/Cart/Shipping/ConfirmOrder.js';
import MyOrder from './component/Order/MyOrder.js';
import Dashboard from './component/Admin/Dashboard.js';
import ProductList from './component/Admin/ProductList.js';
import NewProduct from './component/Admin/NewProduct.js';
import UpdateProduct from './component/Admin/UpdateProduct.js';
function App() {
  
  const {isAuthenticated,user} = useSelector(state=>state.user)

  React.useEffect(() => {
  
    WebFont.load({
      google: {
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })

    store.dispatch(loadUser())
  }, [])
  

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path='/login' element={<LoginSignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route exact path='/account' element={<Profile />} />
          <Route exact path='/me/update' element={<UpdateProfile />} />
          <Route exact path='/password/update' element={<UpdatePassword />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/login/shipping' element={<Shipping />} />
          <Route exact path='/order/confirm' element={<ConfirmOrder />} />
          <Route exact path='/orders' element={<MyOrder />} />
          <Route exact path='/admin/dashboard' element={<Dashboard />} />
          <Route exact path='/admin/products' element={<ProductList />} />
          <Route exact path='/admin/product' element={<NewProduct />} />
          <Route exact path='/admin/product/:id' element={<UpdateProduct/>} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
