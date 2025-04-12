import { ThemeProvider } from '@mui/material';
import MuiTheme from './components/theme/MuiTheme';
import RouterSetup from './routes/RouterSetup';
import Header from './components/layout/Header';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; // Thêm CartProvider
import { Toaster } from 'react-hot-toast';

function App({ children }) {
    return (
        <ThemeProvider theme={MuiTheme}>
            <AuthProvider>
                <CartProvider> {/* Bao bọc CartProvider */}

                    <Header />
                    {children}
                    <RouterSetup />
                    <Toaster />

                </CartProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;