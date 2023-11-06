import React from "react";
import ReactDOM from 'react-dom/client';

import App from "./components/App"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<App/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    </React.StrictMode>
);
