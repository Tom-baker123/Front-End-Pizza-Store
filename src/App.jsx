import './App.css'
import { Link, Route, Routes } from "react-router-dom";
import Provider from './Provider';
import theme from './theme'
import { ThemeProvider } from '@mui/material';
import CategoryList from './components/CategoryList';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import My_Item from './components/My_Item';

function App({ children }) {

  return (<>
    {/* -[Theme của tailwindcss]---------------------------- */}
    <ThemeProvider theme={theme}>
      {/* <div className="flex">
        <Link to="/"> Home page </Link>
        <Link to="/about"> About page </Link>
      </div> */}

      {/* -[Thiết lập Routing]------------------------------ */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='*' element={<h1>404 Page</h1>} /> {/* Dùng để xác định trang có bị lỗi không ? */}
        <Route path='/:id' element={<Home/>} />  {/* Dùng để truyền id lên trên URL trang Home */}
      </Routes>
      {/* -[Thiết lập Routing - End]------------------------ */}

      <Link to="/about"> About page </Link>
    </ThemeProvider>
    {/* -[Theme của tailwindcss - End]---------------------- */}
  </>
  )
}

export default App
