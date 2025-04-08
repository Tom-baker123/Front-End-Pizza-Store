import React from 'react'

const GeneralProfile = () => {
  const fullName = localStorage.getItem('fullName');
  return (
    <div >
      <h2 className='text-3xl font-bold mb-7'>GeneralProfile</h2>
      <div className="flex flex-col items-center bg-gray-100 p-20 rounded-3xl">
        <img className='mb-2' src="/Images/Icon/Profile-user.png" alt="" width={120} height={120} />
        <h2>👋Hello user, <span>{fullName}</span> </h2>
      </div>
    </div>
  )
}

export default GeneralProfile