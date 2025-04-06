import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import About from '../pages/About'
import Cart from '../pages/Cart'
import FoodCategory from '../pages/FoodCategory'

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
      <Route path='*' element={<>404</>} />
    </Routes>
    {/* -[Thiết lập url - End]------------------------------ */}
  </>)
}

export default RouterSetup