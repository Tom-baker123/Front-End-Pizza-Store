import { ThemeProvider } from '@mui/material';
import './App.css'
import MuiTheme from './theme/MuiTheme';
import RouterSetup from './router/RouterSetup';
import Header from './components/layout/Header';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

function App({ children }) {

  return (<>
    {/* -[Theme của MUI]---------------------------- */}
    <ThemeProvider theme={MuiTheme}>

      {/* -[Authentication]--------------------------- */}
      <AuthProvider>
        {/* -[Authentication]--------------------------- */}
        
        
        <Header />
        {children}

        {/* -[Setup Router]----------------------------- */}
        <RouterSetup />
        {/* -[Setup Router - End]----------------------- */}
        
        
        {/* -[TOAST]------------------------------------ */}
        <Toaster /> {/* Thêm Toaster để hiển thị thông báo */}
        {/* -[TOAST - END]------------------------------ */}

      </AuthProvider>
      {/* -[Authentication - End]--------------------- */}
    </ThemeProvider>
    {/* -[Theme của MUI - End]---------------------- */}
  </>);
}

export default App
