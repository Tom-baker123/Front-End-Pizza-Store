import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import About from '../pages/About'
import Cart from '../pages/Cart'
import FoodCategory from '../pages/FoodCategory'
import Login from '../pages/authentication/Login'
import Profile from '../pages/Profile'
import GeneralProfile from '../components/layout/profile/GeneralProfile.jsx'
import OrderProfile from '../components/layout/profile/OrderProfile.jsx'
import AccountProfile from '../components/layout/profile/AccountProfile.jsx'

const RouterSetup = () => {
  return (<>
    {/* -[Thiết lập url]------------------------------------ */}
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/food-category' element={<FoodCategory/>} />
      <Route path='/food-category/:categoryId' element={<FoodCategory />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/about' element={<About />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/login' element={<Login/>} />
      
      <Route path='/profile' element={<Profile />}>
        <Route path='general' element={<GeneralProfile/>}/>
        <Route path='order' element={<OrderProfile/>}/>
        <Route path='account' element={<AccountProfile/>}/>
      </Route>

      <Route path='*' element={<>404</>} />
    </Routes>
    {/* -[Thiết lập url - End]------------------------------ */}
  </>)
}

export default RouterSetup