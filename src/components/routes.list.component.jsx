import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {userStore} from "../store/userStore";
import {menuStore} from "../store/public/menuStore";

import {GenerateUrl} from "../utils/generateUrl";

import AdminLayout from "../layout/admin.layout.component";
import PublicLayout from "../layout/public.layout.component";

import Page404 from "../pages/404/404.page";
import LoginPage from "../pages/login/login.page";
import ProfilePage from "../pages/admin/profile/profile.page";

// ADMIN PAGES
import UsersPage from "../pages/admin/users/users.page";
import AddUserPage from "../pages/admin/users/add.user.page";
import EditUserPage from "../pages/admin/users/edit.user.page";
import AdminAllNewsPage from "../pages/admin/news/all.news.page";
import AdminNewsPage from "../pages/admin/news/news.page";
import EditNewsPage from "../pages/admin/news/edit.news.page";
import AddNewsPage from "../pages/admin/news/add.news.page";
import AdminDocumentsPage from "../pages/admin/documents/documents.page";
import ViewDocumentPage from "../pages/admin/documents/document.page";
import AddDocumentPage from "../pages/admin/documents/add.document.page";
import EditDocumentPage from "../pages/admin/documents/edit.document.page";
import AdminEmployeesPage from "../pages/admin/employees/employees.page";
import AdminEmployeePage from "../pages/admin/employees/employee.page";
import AddEmployeePage from "../pages/admin/employees/add.employee.page";
import EditEmployeePage from "../pages/admin/employees/edit.employee.page";
import AddCategoryEmployeesPage from "../pages/admin/employees/category/add.category.employees.page";
import EditCategoryEmployeesPage from "../pages/admin/employees/category/edit.category.employees.page";
import AdminFoodsPage from "../pages/admin/food/foods.page";
import AdminFoodPage from "../pages/admin/food/food.page";
import AddFoodPage from "../pages/admin/food/add.food.page";
import EditFoodPage from "../pages/admin/food/edit.food.page";
import AdminModesPage from "../pages/admin/mode/modes.page";
import AdminModePage from "../pages/admin/mode/mode.page";
import AdminLessonsPage from "../pages/admin/lessons/lessons.page";
import AdminLessonPage from "../pages/admin/lessons/lesson.page";
import AddLessonPage from "../pages/admin/lessons/add.lesson.page";
import EditLessonPage from "../pages/admin/lessons/edit.lesson.page";
import AdminAboutPage from "../pages/admin/about/about.page";
import EditAboutPage from "../pages/admin/about/edit.about.page";
import AdminGroupsPage from "../pages/admin/groups/groups.page";
import AdminGroupPage from "../pages/admin/groups/group.page";
import AddGroupPage from "../pages/admin/groups/add.group.page";
import EditGroupPage from "../pages/admin/groups/edit.group.page";
import AdminMediaFilesPage from "../pages/admin/media.files/media.files.page";
import AdminMediaFilePage from "../pages/admin/media.files/media.file.page";
import AddMediaFilePage from "../pages/admin/media.files/add.media.file.page";
import EditMediaFilePage from "../pages/admin/media.files/edit.media.file.page";

// PUBLIC PAGES
import IndexPage from "../pages/public/index.page";
import LessonsPage from "../pages/public/lessons/lessons.page";
import LessonPage from "../pages/public/lessons/lesson.page";
import DocumentsPage from "../pages/public/documents/documents.page";
import EmployeesPage from "../pages/public/employees/employees.page";
import EmployeePage from "../pages/public/employees/employee.page";
import FoodPage from "../pages/public/food/food.page";
import ModePage from "../pages/public/mode/mode.page";
import AllNewsPage from "../pages/public/news/all.news.page";
import NewsPage from "../pages/public/news/news.page";
import MenuPage from "../pages/admin/menu/menu.page";
import AddMenuPage from "../pages/admin/menu/add.menu.page";
import EditMenuPage from "../pages/admin/menu/edit.menu.page";
import CustomPage from "../pages/public/custom/custom.page";
import ContactsPage from "../pages/public/contacts/contacts.page";
import GroupsPage from "../pages/public/groups/groups.page";
import GroupPage from "../pages/public/groups/group.page";
import SupportPage from "../pages/public/support/support.page";

const RoutesList = () => {
    const menu = menuStore.value.all.filter(item => item.custom_page === 1);

    console.log(menuStore.value.all.filter(item => item.custom_page === 0));

    const customRoutes = React.useMemo(() => {
        return (
            <>
                {
                    menu.map(item =>
                        <Route
                            exact={true}
                            key={item.title}
                            path={GenerateUrl(item.title)}
                            element={<CustomPage/>}
                        />
                    )
                }
            </>
        )
    }, [menu]);

    const publicRoutes = (
        <Route path='/' element={<PublicLayout />}>
            <Route index element={<IndexPage />} />
            <Route path='/платные-услуги'>
                <Route index element={<LessonsPage />} />
                <Route path=':id' element={<LessonPage />} />
            </Route>
            <Route path='/documents' exact={true} element={<DocumentsPage />} />
            <Route path='/руководство-педагогический-состав'>
                <Route index element={<EmployeesPage />} />
                <Route path=':id' element={<EmployeePage />} />
            </Route>
            <Route path='/питание' exact={true} element={<FoodPage />} />
            <Route path='/контакты' exact={true} element={<ContactsPage />} />
            <Route path='/задать-вопрос' exact={true} element={<SupportPage />} />
            <Route path='/наши-группы' exact={true} element={<GroupsPage />} />
            <Route path='/наши-группы/:id' exact={true} element={<GroupPage />} />
            <Route path='/новости'>
                <Route index element={<AllNewsPage />} />
                <Route path=':id' element={<NewsPage />} />
            </Route>
            {customRoutes}
        </Route>
    );

    const adminRoutes = (
        <Routes>
            <Route path='/admin' element={<AdminLayout />}>
                <Route path='users'>
                    <Route index element={<UsersPage />} />
                    <Route path='edit/:id' element={<EditUserPage />} />
                    <Route path='new' element={<AddUserPage />} />
                </Route>
                <Route path='mediaFiles'>
                    <Route index element={<AdminMediaFilesPage />} />
                    <Route path=':id' element={<AdminMediaFilePage />} />
                    <Route path='new' element={<AddMediaFilePage />} />
                    <Route path='edit/:id' element={<EditMediaFilePage />} />
                </Route>
                <Route path='menu'>
                    <Route index element={<MenuPage />} />
                    <Route path='new' element={<AddMenuPage />} />
                    <Route path='edit/:id' element={<EditMenuPage />} />
                </Route>
                <Route path='news'>
                    <Route index element={<AdminAllNewsPage />} />
                    <Route path=':id' element={<AdminNewsPage />} />
                    <Route path='new' element={<AddNewsPage />} />
                    <Route path='edit/:id' element={<EditNewsPage />} />
                </Route>
                <Route path='documents'>
                    <Route index element={<AdminDocumentsPage />} />
                    <Route path=':id' element={<ViewDocumentPage />} />
                    <Route path='new' element={<AddDocumentPage />} />
                    <Route path='edit/:id' element={<EditDocumentPage />} />
                </Route>
                <Route path='employees'>
                    <Route index element={<AdminEmployeesPage />} />
                    <Route path=':id' element={<AdminEmployeePage />} />
                    <Route path='new' element={<AddEmployeePage />} />
                    <Route path='edit/:id' element={<EditEmployeePage />} />
                    <Route path='category/new' element={<AddCategoryEmployeesPage />} />
                    <Route path='category/edit/:id' element={<EditCategoryEmployeesPage />} />
                </Route>
                <Route path='food'>
                    <Route index element={<AdminFoodsPage />} />
                    <Route path='menu/:id' element={<AdminFoodPage />} />
                    <Route path='menu/new' element={<AddFoodPage />} />
                    <Route path='menu/edit/:id' element={<EditFoodPage />} />
                </Route>
                <Route path='mode'>
                    <Route index element={<AdminModesPage />} />
                    <Route path=':id' element={<AdminModePage />} />
                    <Route path='new' element={<AdminModePage />} />
                </Route>
                <Route path='lessons'>
                    <Route index element={<AdminLessonsPage />} />
                    <Route path=':id' element={<AdminLessonPage />} />
                    <Route path='new' element={<AddLessonPage />} />
                    <Route path='edit/:id' element={<EditLessonPage />} />
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

    if (userStore.value && (userStore.value.role === "admin" || userStore.value.role === "superadmin")) {
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
