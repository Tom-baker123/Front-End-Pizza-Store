import React from 'react'
import { getAllTopping } from '../../api/GlobalAPI';

const ToppingButton = () => {
    const { topping, loading, error } = getAllTopping();
    return (
        <div>
            <div className="flex flex-col gap-2">
                {(topping && topping.length > 0) ?
                    topping.map((item, index) => (
                        <div className="flex items-center gap-2" key={index} >
                            <input type="checkbox" id={`tp-${index}`}/>
                            <label htmlFor={`tp-${index}`}>{item.name}</label>
                        </div>
                    )) : (
                        <>
                            <div className="flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-200">
                                <img src="/Images/Icon/Fail.png" alt="icon" width={50} height={50}
                                    className='group-hover:scale-125 transition-all ease-in-out'
                                />
                                <h2 className='text-red-500 font-bold'>API FAIL</h2>
                            </div>
                        </>)
                }
            </div>
        </div >
    )
}

export default ToppingButton