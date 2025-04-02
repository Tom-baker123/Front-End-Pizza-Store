import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import About from '../pages/About'
import Cart from '../pages/Cart'

const RouterSetup = () => {

  return (<>
    <div>
      {/* -[Liên Kết tới các trang]--------------------------- */}
        {/* <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link> */}
      {/* -[Liên Kết tới các trang - End]--------------------- */}
    </div>
    {/* -[Thiết lập url]------------------------------------ */}
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/about' element={<About />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='*' element={<>404</>} />
    </Routes>
    {/* -[Thiết lập url - End]------------------------------ */}
  </>)
}

export default RouterSetup