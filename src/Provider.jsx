import React from 'react'
import Header from './components/Header'

const Provider = ({children}) => {
  return (
    <div className='px-5 md:px-10 relative'> 
        <Header/>
        {children}
    </div>
  )
}

export default Provider