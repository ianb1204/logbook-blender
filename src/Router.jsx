import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom'
import App from "./pages/App.jsx";

const Router = (props) => {
    return (
        <BrowserRouter basename='/logbook-blender/'>
            <Routes>
                <Route path={'/'} element={<Navigate to={"/fr"}/>}/>
                <Route path={'/:lang/*'} element={<App {...props}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router