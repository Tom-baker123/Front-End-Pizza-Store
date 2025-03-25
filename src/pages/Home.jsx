import { Button } from '@mui/material'
import React, { use, useEffect } from 'react'
import CategoryList from '../components/CategoryList'
import Provider from '../Provider'
// import { useParams, useSearchParams } from 'react-router-dom'

const Home = ({children}) => {
  

  return (
    <div className='px-5 md:px-10 relative'>
      <Provider>{children}</Provider>
      
      {/* <div className='w-full h-20 bg-amber-700 2xl:w-7xl'></div> */}
      {/* -[Thiết lập Category]----------------------------- */}
      <div className='px-5 md:px-10'>
        <CategoryList/>
      </div>
      {/* -[Thiết lập Category - End]----------------------- */}
    </div>
  )
}
export default Home;
