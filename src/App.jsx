
import './App.css'
import Navbar from "./components/Navbar/Navbar.jsx";
import {Route, Routes} from "react-router-dom";
import HomePage from './pages/HomePage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import ProductPage from './pages/ProductPage.jsx'

function App() {
  return (
    <>
        <Navbar/>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/searchpage' element={<SearchPage/>}/>
            <Route path='/loginpage' element={<LoginPage/>}/>
            <Route path='/registerpage' element={<RegisterPage/>}/>
            <Route path='/profilepage' element={<ProfilePage/>}/>
            <Route path='/product' element={<ProductPage/>}/>
        </Routes>
    </>
  )
}

export default App
