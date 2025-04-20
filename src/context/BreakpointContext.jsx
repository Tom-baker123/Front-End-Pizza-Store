import React, {
    createContext, useContext,
    useState, useEffect, useRef
} from 'react'

// Tạo context để chứa value breakpoint 
const BreakpointContext = createContext();

const Breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
};

// Hàm xác định breakpoint dựa vào kích thước màn hình
const getCurrentBreakpoint = (width) => {
    if (width >= Breakpoints['2xl']) return;
    if (width >= Breakpoints.xl) return;
    if (width >= Breakpoints.lg) return;
    if (width >= Breakpoints.md) return;
    if (width >= Breakpoints.sm) return;
    return 'base'; // Màn hình < 640px
}

// Hàm xác định chiều ngang hoặc dọc (portrait hoặc landscape)
const getOrientation = () => {
    window.matchMedia('orientation: portrait').matches ? 'portrait' : 'landscape';
}

// Provider
export const BreakpointProvider = ({ children }) => {
    const [breakpoint, setBreakpoint] = useState(getCurrentBreakpoint(window.innerWidth)); // State lưu breakpoint
    const [orientation, setOrientation] = useState(getOrientation()); // State lưu orientation 
    const debounceRef = useRef(null); // Tham chiếu để giữ timer debounce (dùng trong setTimeout)

    useEffect(() => {
        // Hàm xử lý resize và orientation change
        const handleResize = () => {
            // Nếu đã có debounce đang chạy, thì clear nó đi để khởi động lại
            if (debounceRef.current) clearTimeout(debounceRef.current);

            // Chờ 200ms sau mỗi lần resize hoặc orientation change để set lại state
            debounceRef.current = setTimeout(() => {
                setBreakpoint(getCurrentBreakpoint(window.innerWidth)); // Cập nhật breakpoint
                setOrientation(getOrientation()) // Cập nhật orientation
            }, 500); // Thời gian debounce 500ms
        };

        // Lắng nghe sự kiện resize và orientation change
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        // Cleanup: loại bỏ sự kiện khi component bị hủy
        return () => {
            window.addEventListener('resize', handleResize);
            window.addEventListener('orientationchange', handleResize);

            if (debounceRef.current) clearTimeout(debounceRef.current) // Clear debounce timer khi component bị hủy
        }
    }, [])

    return (
        <BreakpointContext.Provider value={{breakpoint, orientation}}>
            {children} 
        </BreakpointContext.Provider>
    )
}

// Custom hook để sử dụng breakpoint và orientation trong các component
export const useBreakpoint = () => useContext(BreakpointContext)