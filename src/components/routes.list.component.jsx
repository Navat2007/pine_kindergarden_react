import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import useAuthStore from "../store/authStore";

import AdminLayout from "../layout/admin.layout.component";
import PublicLayout from "../layout/public.layout.component";

import Page404 from "../pages/404.page";
import LoginPage from "../pages/login/login.page";
import ProfilePage from "../pages/profile.page";

// ADMIN PAGES
import UsersPage from "../pages/admin/users/users.page";
import AdminUsersPage from "../pages/admin/users/admin.users.page";

// PUBLIC PAGES
import MainPage from "../pages/public/index.page";
import LessonsPage from "../pages/public/lessons.page";
import DocumentsPage from "../pages/public/documents.page";
import TeachersPage from "../pages/public/teachers.page";
import FoodPage from "../pages/public/food.page";
import AboutPage from "../pages/public/about.page";
import ModePage from "../pages/public/mode.page";

const RoutesList = () => {
    const {user} = useAuthStore();

    const publicRoutes = (
        <Route path="/" element={<PublicLayout/>}>
            <Route
                index
                element={<MainPage/>}
            />
            <Route
                path="/lessons"
                exact={true}
                element={<LessonsPage/>}
            />
            <Route
                path="/documents"
                exact={true}
                element={<DocumentsPage/>}
            />
            <Route
                path="/teachers"
                exact={true}
                element={<TeachersPage/>}
            />
            <Route
                path="/food"
                exact={true}
                element={<FoodPage/>}
            />
            <Route
                path="/mode"
                exact={true}
                element={<ModePage/>}
            />
            <Route
                path="/about"
                exact={true}
                element={<AboutPage/>}
            />
        </Route>
    );

    React.useEffect(() => {
        console.log(user);
    }, [user]);

    if (user && (user.role === "admin" || user.role === "superadmin")) {
        return (
            <Routes>
                <Route path='/admin' element={<AdminLayout/>}>
                    <Route path='users'>
                        <Route index element={<UsersPage/>}/>
                        <Route path='admin/:id' element={<AdminUsersPage/>}/>
                        <Route path='admin/new' element={<AdminUsersPage/>}/>
                    </Route>
                </Route>
                <Route path='/profile' exact={true} element={<AdminLayout/>}>
                    <Route index element={<ProfilePage/>}/>
                </Route>
                <Route path='/login' exact={true} element={<Navigate to='/admin/users'/>}/>
                {publicRoutes}
                <Route path='*' element={<Page404/>}/>
            </Routes>
        );
    }

    return (
        <Routes>
            {publicRoutes}
            <Route path="/login" exact={true} element={<LoginPage/>}/>
            <Route path="*" element={<Navigate to='/'/>}/>
        </Routes>
    );
};

export default RoutesList;
