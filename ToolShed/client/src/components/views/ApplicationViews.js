import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../auth/Login";
import Hello from "../Hello";
import Register from "../auth/Register";
import ToolList from "../tool/ToolList";
import ToolForm from "../tool/ToolForm";
import ListConditions from "../condition/ListConditions";
import ConditionForm from "../condition/ConditionForm";
import ToolDetails from "../tool/ToolDetails";
import UserTools from "../tool/UserTools";
import { ToolEdit } from "../tool/ToolEdit";
import ToolCommentForm from "../comment/ToolCommentForm";
import { UserEdit } from "../users/UserEdit";


export default function ApplicationViews({ isLoggedIn, role, user }) {
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
                    <Route path="myaccount" element={<UserEdit user={user} />} />
                    <Route path="toolDetails/:id" element={<ToolDetails />} />

                    <Route path="toolList" element={<ToolList />} />
                    <Route path="usertools" element={isLoggedIn ? <UserTools user={user} /> : <Navigate to="/login" />} />
                    <Route path="addtool" element={isLoggedIn ? <ToolForm user={user} /> : <Navigate to="/login" />} />
                    <Route path="ToolComment/add/:toolId" element={isLoggedIn ? <ToolCommentForm user={user} /> : <Navigate to="/login" />} />
                    <Route path="edittool/:id" element={
                        isLoggedIn
                            ? <ToolEdit user={user} />
                            : <Navigate to="/login" />
                    }
                    />
                    <Route path="conditions">
                        <Route index
                            element={
                                isLoggedIn && role === "Admin"
                                    ? <ListConditions />
                                    : <Navigate to="/login" />
                            }
                        />
                        <Route path="new" element={
                            isLoggedIn && role === "Admin"
                                ? <ConditionForm />
                                : <Navigate to="/login" />
                        }
                        />
                        <Route path="edit/:conditionName" element={
                            isLoggedIn && role === "Admin"
                                ? <ConditionForm />
                                : <Navigate to="/login" />
                        }
                        />
                    </Route>
                    <Route path="" />
                    <Route path="*" element={<p>Whoops, nothing here ...</p>} />
                </Route>
            </Routes>
        </main>
    );
};