import { ThemeProvider } from '@mui/material';
import './App.css'
import MuiTheme from './theme/MuiTheme';
import RouterSetup from './router/RouterSetup';
import Header from './components/layout/Header';

function App({children}) {

  return ( <>
    {/* -[Theme của MUI]---------------------------- */}
    <ThemeProvider theme={MuiTheme}>
      
      <Header/>
      {children}

      
      {/* -[Setup Router]----------------------------- */}
      <RouterSetup/>
      {/* -[Setup Router - End]----------------------- */}

    </ThemeProvider>
    {/* -[Theme của MUI - End]---------------------- */}
  </> );
}

export default App
