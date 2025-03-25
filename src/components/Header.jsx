import { Search } from 'lucide-react'
import React, { useState } from 'react'
import Button from './Mui-Components/MyButton'
// import { BrowserRouter, Link } from 'react-router-dom'
import LoginModal from './Mui-Components/Modal'
import MyDropdown from './Headless-UI/DropdownMenu'
import Slider from './slider/Slider';
import SliderParam from './Slider-Config/SliderParam'
import CategoryList from './CategoryList'

const Header = () => {
  const [user, setUser] = useState(false);

  return (
    <>
    {/* <BrowserRouter> */}
        <div className='flex justify-between items-center px-2 py-3 mt-2 rounded-xl md:px-5'>
          {/* --[Main Logo]----------------------------------------------------------- */}
          <img src="images/Logo/logo-pizza-4-anh-tai.png" alt="Logo"
            width={40} height={40} />
          {/* --[Main Logo - End]----------------------------------------------------- */}


          {/* --[Ô tìm kiếm]----------------------------------------------------------
            | Màu Sắc: 
            | + Ô: Xám nhạt
            | + Viền: xám
            ------------------------------------------------------------------------*/}
          <div className="shadow-lg hidden md:flex border-2 border-gray-400 rounded-4xl p-2 pl-5 bg-gray-50  w-96">
            <input type="text" className=' w-full bg-transparent outline-none'
              placeholder='Find Your favorite here 😋' />
            <Search className='stroke-gray-500' />
          </div>
          {/* --[Ô tìm kiếm - End]---------------------------------------------------- */}


          {/* --[Authentication Button]----------------------------------------------- */}
          <div className="flex gap-5">
            {user === true ? (
              <img src="images/Logo/logo-pizza-4-anh-tai.png" alt="Logo"
                width={30} height={30} />
            ) : (
              <>
                <LoginModal type={"Login"}>  Login </LoginModal>
                <LoginModal type={"Signup"}> Sign Up </LoginModal>

              </>
            )}
            {/* <img src="images/Logo/logo-pizza-4-anh-tai.png" alt="Logo"
            width={30} height={30} /> 
            */}
          </div>
          {/* --[Authentication Button - End]----------------------------------------- */}
        </div>
        {/* <MyDropdown/> */}

        {/* --[Slider Test]------------------------------------------------------- */}
        <>
          <Slider />
          <SliderParam />
          
        </>
        {/* --[Slider Test - End]--------------------------------------------------- */}
        
        {/* </BrowserRouter > */}
      </>
  )
}

export default Header;