import { ThemeProvider } from '@mui/material';
import './App.css';
import MuiTheme from './theme/MuiTheme';
import RouterSetup from './router/RouterSetup';
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