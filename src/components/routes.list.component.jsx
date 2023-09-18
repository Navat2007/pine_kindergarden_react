import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import useAuthStore from "../store/authStore";

import AdminLayout from "../layout/admin.layout.component";
import PublicLayout from "../layout/public.layout.component";

import Page404 from "../pages/404/404.page";
import LoginPage from "../pages/login/login.page";
import ProfilePage from "../pages/admin/profile/profile.page";

// ADMIN PAGES
import UsersPage from "../pages/admin/users/users.page";
import AdminUsersPage from "../pages/admin/users/admin.users.page";
import AdminAllNewsPage from "../pages/admin/news/all.news.page";
import AdminNewsPage from "../pages/admin/news/news.page";
import AdminDocumentsPage from "../pages/admin/documents/documents.page";
import AdminDocumentPage from "../pages/admin/documents/document.page";
import AdminTeachersPage from "../pages/admin/teachers/teachers.page";
import AdminFoodsPage from "../pages/admin/food/foods.page";
import AdminFoodPage from "../pages/admin/food/food.page";
import AdminModesPage from "../pages/admin/mode/modes.page";
import AdminModePage from "../pages/admin/mode/mode.page";
import AdminLessonsPage from "../pages/admin/lessons/lessons.page";
import AdminLessonPage from "../pages/admin/lessons/lesson.page";
import AdminAboutPage from "../pages/admin/about/about.page";
import AdminGroupPage from "../pages/admin/about/group.page";

// PUBLIC PAGES
import MainPage from "../pages/public/index.page";
import LessonsPage from "../pages/public/lessons.page";
import DocumentsPage from "../pages/public/documents.page";
import TeachersPage from "../pages/public/teachers.page";
import FoodPage from "../pages/public/food.page";
import AboutPage from "../pages/public/about.page";
import ModePage from "../pages/public/mode.page";

const RoutesList = () => {
    const { user } = useAuthStore();

    const publicRoutes = (
        <Route path='/' element={<PublicLayout />}>
            <Route index element={<MainPage />} />
            <Route path='/lessons' exact={true} element={<LessonsPage />} />
            <Route path='/documents' exact={true} element={<DocumentsPage />} />
            <Route path='/teachers' exact={true} element={<TeachersPage />} />
            <Route path='/food' exact={true} element={<FoodPage />} />
            <Route path='/mode' exact={true} element={<ModePage />} />
            <Route path='/about' exact={true} element={<AboutPage />} />
        </Route>
    );

    const adminRoutes = (
        <Routes>
            <Route path='/admin' element={<AdminLayout />}>
                <Route path='users'>
                    <Route index element={<UsersPage />} />
                    <Route path='admin/:id' element={<AdminUsersPage />} />
                    <Route path='admin/new' element={<AdminUsersPage />} />
                </Route>
                <Route path='news'>
                    <Route index element={<AdminAllNewsPage />} />
                    <Route path=':id' element={<AdminNewsPage />} />
                    <Route path='new' element={<AdminNewsPage />} />
                </Route>
                <Route path='documents'>
                    <Route index element={<AdminDocumentsPage />} />
                    <Route path=':id' element={<AdminDocumentPage />} />
                    <Route path='new' element={<AdminDocumentPage />} />
                </Route>
                <Route path='teachers'>
                    <Route index element={<AdminTeachersPage />} />
                    <Route path=':id' element={<AdminTeachersPage />} />
                    <Route path='new' element={<AdminTeachersPage />} />
                </Route>
                <Route path='food'>
                    <Route index element={<AdminFoodsPage />} />
                    <Route path=':id' element={<AdminFoodPage />} />
                    <Route path='new' element={<AdminFoodPage />} />
                </Route>
                <Route path='mode'>
                    <Route index element={<AdminModesPage />} />
                    <Route path=':id' element={<AdminModePage />} />
                    <Route path='new' element={<AdminModePage />} />
                </Route>
                <Route path='lessons'>
                    <Route index element={<AdminLessonsPage />} />
                    <Route path=':id' element={<AdminLessonPage />} />
                    <Route path='new' element={<AdminLessonPage />} />
                </Route>
                <Route path='about'>
                    <Route index element={<AdminAboutPage />} />
                    <Route path='groups/:id' element={<AdminGroupPage />} />
                    <Route path='groups/new' element={<AdminGroupPage />} />
                </Route>
            </Route>
            <Route path='/profile' exact={true} element={<AdminLayout />}>
                <Route index element={<ProfilePage />} />
            </Route>
            <Route path='/login' exact={true} element={<Navigate to='/admin/users' />} />
            {publicRoutes}
            <Route path='*' element={<Page404 />} />
        </Routes>
    );

    React.useEffect(() => {
        //console.log(user);
    }, [user]);

    if (user && (user.role === "admin" || user.role === "superadmin")) {
        return adminRoutes;
    }

    return (
        <Routes>
            {publicRoutes}
            <Route path='/login' exact={true} element={<LoginPage />} />
            {/*<Route path="*" element={<Navigate to='/'/>}/>*/}
            <Route path='*' element={<Page404 />} />
        </Routes>
    );
};

export default RoutesList;
