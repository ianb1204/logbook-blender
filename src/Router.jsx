import {BrowserRouter, Routes, Route} from 'react-router-dom'
import App from "./pages/App.jsx";

const Router = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/*'} element={<App {...props}/>}/>
                <Route path={'/:lang'} element={<App {...props}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router