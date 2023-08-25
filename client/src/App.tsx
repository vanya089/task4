import React from 'react';
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Route, Routes} from "react-router-dom";
import Registration from "./pages/Registration";
import PrivateRoute from "./router/PrivateRoute";
import Login from "./pages/Login";


function App() {
    return (
        <div className="flex flex-col items-center gap-[100px]">
            <Header/>
            <div >
                <Routes>
                    <Route element={<PrivateRoute/>}>
                        <Route path="/" element={<Home/>}/>
                    </Route>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                </Routes>
            </div>
            <Footer/>
        </div>
    )
}

export default App;
