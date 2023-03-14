import React from "react";
import { Route, Routes } from "react-router-dom";

import HomeComercial from "./pages/HomeComercial/index"

function Rotas() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomeComercial/>} />
            </Routes>
        </div>
    )
}

export default Rotas;