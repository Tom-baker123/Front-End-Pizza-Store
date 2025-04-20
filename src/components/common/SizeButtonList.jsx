import React from 'react';
import { getAllSize } from '../../api/GlobalAPI';
import { LoaderCircle } from 'lucide-react';

const SizeButtonList = ({ onSizeChange, selectedSize }) => {
    const { size, loading: loadingSize, error } = getAllSize();

    return (
        <div>
            <div className="grid grid-cols-3 gap-5">
                {(size && size.length > 0) ? (
                    size.map((item, index) => (
                        <div
                            onClick={() => onSizeChange(item)} // Truyền toàn bộ object item
                            className={`flex flex-col items-center gap-2 p-3 rounded-lg group cursor-pointer 
                                        ${selectedSize?.sizeID === item.sizeID ? 'bg-green-600 text-white' : 'bg-green-50 hover:bg-green-200 text-primary'}`}
                            key={index}
                        >
                            <h2 className='font-bold'>{item.name}</h2>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-200">
                        {loadingSize ? <LoaderCircle className='animate-spin' /> :
                            <>
                                <img src="/Images/Icon/Fail.png" alt="icon" width={50} height={50} className='group-hover:scale-125 transition-all ease-in-out' />
                                <h2 className='text-red-500 font-bold'>API FAIL</h2>
                            </>
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

export default SizeButtonList;