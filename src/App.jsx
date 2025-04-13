import { ThemeProvider } from '@mui/material';
import MuiTheme from './components/theme/MuiTheme';
import RouterSetup from './routes/RouterSetup';
import Header from './components/layout/Header';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; // Thêm CartProvider
import { Toaster } from 'react-hot-toast';

function App({ children }) {
    return (
        // Thiết lập theme MUIs
        <ThemeProvider theme={MuiTheme}>
            {/* Thiết lập Context của Phân quyền */}
            <AuthProvider>
                {/* Bao bọc CartProvider */}
                <CartProvider> 

                    {/* Thiết lập header */}
                    <Header />
                    {/* Thiết lập các component con */}
                    {children}
                    {/* Thiết lập URL */}
                    <RouterSetup />
                    {/* Thiết lập thông báo Hot Toast Mặc định */}
                    <Toaster />

                </CartProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;