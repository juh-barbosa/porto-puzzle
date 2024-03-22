import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import {RoutesProvider} from "./store/GlobalState";

export default function AppRouter() {
    return(
        <BrowserRouter>
            <RoutesProvider>
                <Routes>
                    <Route element={<Home/>} path='/'/>
                </Routes>
            </RoutesProvider>
        </BrowserRouter>
    )
}
