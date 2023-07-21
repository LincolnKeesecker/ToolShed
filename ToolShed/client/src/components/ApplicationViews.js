import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Hello from "./Hello";
import Register from "./auth/Register";
import ToolList from "./tool/ToolList";


export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
                    />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="toolList" element={<ToolList />} />

                    <Route path="*" element={<p>Whoops, nothing here ...</p>} />
                </Route>
            </Routes>
        </main>
    );
};