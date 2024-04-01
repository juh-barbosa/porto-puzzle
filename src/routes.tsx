import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import {RoutesProvider} from "./store/GlobalState";
import Votacao from "./pages/Votacao";

export default function AppRouter() {
    return(
        <BrowserRouter>
            <RoutesProvider>
                <Routes>
                    <Route element={<Home/>} path='/'/>
                    <Route element={<Votacao/>} path='/votacao' />
                </Routes>
            </RoutesProvider>
        </BrowserRouter>
    )
}
