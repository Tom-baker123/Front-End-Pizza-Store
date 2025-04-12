import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import Contact from '../pages/Contact.jsx'
import About from '../pages/About.jsx'
import Cart from '../pages/Cart.jsx'
import FoodCategory from '../pages/FoodCategory.jsx'
import Login from '../pages/authentication/Login.jsx'
import Profile from '../pages/Profile.jsx'
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