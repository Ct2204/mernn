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
          <Route exact path='/me/update' element={<UpdateProfile/>} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
