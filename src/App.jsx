
import './App.css'
import Navbar from "./components/Navbar/Navbar.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from './pages/HomePage/HomePage.jsx'
import SearchPage from './pages/SearchPage/SearchPage.jsx'
import LoginPage from './pages/LoginPage/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx'
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx'
import ProductPage from './pages/ProductPage/ProductPage.jsx'


function App() {
  return (
    <>
        <Navbar/>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/searchpage' element={<SearchPage/>}/>
            <Route path='/loginpage' element={<LoginPage/>}/>
            <Route path='/registerpage' element={<RegisterPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/product/:id' element={<ProductPage/>}/>
        </Routes>
    </>
  )
}

export default App
