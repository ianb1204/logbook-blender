import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom'
import App from "./App.jsx";

const Router = (props) => {
    return (
        <BrowserRouter basename='/blender-logbook/'>
            <Routes>
                <Route path={'/'} element={<Navigate to={"/fr"}/>}/>
                <Route path={'/:lang/*'} element={<App {...props}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router