import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const renderPages = () => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button type="button" aria-current="page"
                    key={i} onClick={() => onPageChange(i)}
                    className={`min-h-9.5 min-w-9.5 flex justify-center items-center py-2 px-3 text-sm rounded-lg
                            ${currentPage === i
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-800 hover:bg-gray-100'
                        }`}
                >
                    {i}
                </button>
            );
        }

        return pages;
    }

    return (
        <nav className="flex items-center justify-center my-5 gap-x-1" aria-label="Pagination">
            <button type="button" className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" aria-label="Previous"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                </svg>
                <span>Previous</span>
            </button>

            {/* Hiển thị trang */}
            <div className="flex items-center gap-x-1">
                {renderPages()} {/* <button type="button" className="min-h-9.5 min-w-9.5 flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">3</button> */}
            </div>

            <button type="button" className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" aria-label="Next"
                onClick={() => onPageChange(currentPage+1)}
                disabled={currentPage === totalPages}
            >
                <span>Next</span>
                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                </svg>
            </button>
        </nav>
    )
}

export default Pagination