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
import UserPage from "../pages/admin/users/user.page";
import AdminAllNewsPage from "../pages/admin/news/all.news.page";
import AdminNewsPage from "../pages/admin/news/news.page";
import AdminDocumentsPage from "../pages/admin/documents/documents.page";
import ViewDocumentPage from "../pages/admin/documents/document.page";
import AddDocumentPage from "../pages/admin/documents/add.document.page";
import EditDocumentPage from "../pages/admin/documents/edit.document.page";
import AdminTeachersPage from "../pages/admin/teachers/teachers.page";
import AdminTeacherPage from "../pages/admin/teachers/teacher.page";
import AdminFoodsPage from "../pages/admin/food/foods.page";
import AdminFoodPage from "../pages/admin/food/food.page";
import AdminModesPage from "../pages/admin/mode/modes.page";
import AdminModePage from "../pages/admin/mode/mode.page";
import AdminLessonsPage from "../pages/admin/lessons/lessons.page";
import AdminLessonPage from "../pages/admin/lessons/lesson.page";
import AdminAboutPage from "../pages/admin/about/about.page";
import EditAboutPage from "../pages/admin/about/edit.about.page";
import AdminGroupsPage from "../pages/admin/groups/groups.page";
import AdminGroupPage from "../pages/admin/groups/group.page";
import AddGroupPage from "../pages/admin/groups/add.group.page";
import EditGroupPage from "../pages/admin/groups/edit.group.page";
import AdminCategoryTeachersPage from "../pages/admin/teachers/category.teachers.page";
import AdminMediaFilesPage from "../pages/admin/media.files/media.files.page";
import AdminMediaFilePage from "../pages/admin/media.files/media.file.page";

// PUBLIC PAGES
import IndexPage from "../pages/public/index.page";
import LessonsPage from "../pages/public/lessons/lessons.page";
import LessonPage from "../pages/public/lessons/lesson.page";
import DocumentsPage from "../pages/public/documents/documents.page";
import TeachersPage from "../pages/public/teachers/teachers.page";
import TeacherPage from "../pages/public/teachers/teacher.page";
import FoodPage from "../pages/public/food/food.page";
import AboutPage from "../pages/public/about/about.page";
import ModePage from "../pages/public/mode/mode.page";
import GroupPage from "../pages/public/about/group.page";
import AllNewsPage from "../pages/public/news/all.news.page";
import NewsPage from "../pages/public/news/news.page";

const RoutesList = () => {
    const { user } = useAuthStore();

    const publicRoutes = (
        <Route path='/' element={<PublicLayout />}>
            <Route index element={<IndexPage />} />
            <Route path='/lessons'>
                <Route index element={<LessonsPage />} />
                <Route path=':id' element={<LessonPage />} />
            </Route>
            <Route path='/documents' exact={true} element={<DocumentsPage />} />
            <Route path='/teachers'>
                <Route index element={<TeachersPage />} />
                <Route path=':id' element={<TeacherPage />} />
            </Route>
            <Route path='/food' exact={true} element={<FoodPage />} />
            <Route path='/mode' exact={true} element={<ModePage />} />
            <Route path='/about' exact={true} element={<AboutPage />} />
            <Route path='/group/:id' exact={true} element={<GroupPage />} />
            <Route path='/news'>
                <Route index element={<AllNewsPage />} />
                <Route path=':id' element={<NewsPage />} />
            </Route>
        </Route>
    );

    const adminRoutes = (
        <Routes>
            <Route path='/admin' element={<AdminLayout />}>
                <Route path='users'>
                    <Route index element={<UsersPage />} />
                    <Route path=':id' element={<UserPage />} />
                    <Route path='new' element={<UserPage />} />
                </Route>
                <Route path='mediaFiles'>
                    <Route index element={<AdminMediaFilesPage />} />
                    <Route path=':id' element={<AdminMediaFilePage />} />
                    <Route path='new' element={<AdminMediaFilePage />} />
                </Route>
                <Route path='news'>
                    <Route index element={<AdminAllNewsPage />} />
                    <Route path=':id' element={<AdminNewsPage />} />
                    <Route path='new' element={<AdminNewsPage />} />
                </Route>
                <Route path='documents'>
                    <Route index element={<AdminDocumentsPage />} />
                    <Route path=':id' element={<ViewDocumentPage />} />
                    <Route path='new' element={<AddDocumentPage />} />
                    <Route path='edit/:id' element={<EditDocumentPage />} />
                </Route>
                <Route path='teachers'>
                    <Route index element={<AdminTeachersPage />} />
                    <Route path=':id' element={<AdminTeacherPage />} />
                    <Route path='new' element={<AdminTeacherPage />} />
                    <Route path='category/:id' element={<AdminCategoryTeachersPage />} />
                    <Route path='category/new' element={<AdminCategoryTeachersPage />} />
                </Route>
                <Route path='food'>
                    <Route index element={<AdminFoodsPage />} />
                    <Route path='menu/:id' element={<AdminFoodPage />} />
                    <Route path='menu/new' element={<AdminFoodPage />} />
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
                    <Route path='edit' element={<EditAboutPage />} />
                </Route>
                <Route path='groups'>
                    <Route index element={<AdminGroupsPage />} />
                    <Route path=':id' element={<AdminGroupPage />} />
                    <Route path='new' element={<AddGroupPage />} />
                    <Route path='edit/:id' element={<EditGroupPage />} />
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

    if (user && (user.role === "admin" || user.role === "superadmin")) {
        return adminRoutes;
    }

    return (
        <Routes>
            {publicRoutes}
            <Route path='/login' exact={true} element={<LoginPage />} />
            <Route path='*' element={<Page404 />} />
        </Routes>
    );
};

export default RoutesList;
