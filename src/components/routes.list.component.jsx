import React, {lazy} from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {userStore} from "../store/userStore";
import {menuStore} from "../store/public/menuStore";

import {GenerateUrl} from "../utils/generateUrl";

import PublicLayout from "../layout/public.layout.component";

import Page404 from "../pages/404/404.page";
import LoginPage from "../pages/login/login.page";

// PUBLIC PAGES
import IndexPage from "../pages/public/index.page";
import LessonsPage from "../pages/public/lessons/lessons.page";
import LessonPage from "../pages/public/lessons/lesson.page";
import DocumentsPage from "../pages/public/documents/documents.page";
import EmployeesPage from "../pages/public/employees/employees.page";
import EmployeePage from "../pages/public/employees/employee.page";
import FoodPage from "../pages/public/food/food.page";
import AllNewsPage from "../pages/public/news/all.news.page";
import NewsPage from "../pages/public/news/news.page";
import CustomPage from "../pages/public/custom/custom.page";
import ContactsPage from "../pages/public/contacts/contacts.page";
import GroupsPage from "../pages/public/groups/groups.page";
import GroupPage from "../pages/public/groups/group.page";
import SupportPage from "../pages/public/support/support.page";
import AboutPage from "../pages/public/about/about.page";

// ADMIN PAGES
const AdminLayout = lazy(() => import("../layout/admin.layout.component"));

const MenuPage = lazy(() => import("../pages/admin/menu/menu.page"));
const AddMenuPage = lazy(() => import("../pages/admin/menu/add.menu.page"));
const EditMenuPage = lazy(() => import("../pages/admin/menu/edit.menu.page"));
const ProfilePage = lazy(() => import("../pages/admin/profile/profile.page"));
const UsersPage = lazy(() => import("../pages/admin/users/users.page"));
const AddUserPage = lazy(() => import("../pages/admin/users/add.user.page"));
const EditUserPage = lazy(() => import("../pages/admin/users/edit.user.page"));
const AdminAllNewsPage = lazy(() => import("../pages/admin/news/all.news.page"));
const AdminNewsPage = lazy(() => import("../pages/admin/news/news.page"));
const EditNewsPage = lazy(() => import("../pages/admin/news/edit.news.page"));
const AddNewsPage = lazy(() => import("../pages/admin/news/add.news.page"));
const AdminDocumentsPage = lazy(() => import("../pages/admin/documents/documents.page"));
const ViewDocumentPage = lazy(() => import("../pages/admin/documents/document.page"));
const AddDocumentPage = lazy(() => import("../pages/admin/documents/add.document.page"));
const EditDocumentPage = lazy(() => import("../pages/admin/documents/edit.document.page"));
const EditMediaFilePage = lazy(() => import("../pages/admin/media.files/edit.media.file.page"));
const AddMediaFilePage = lazy(() => import("../pages/admin/media.files/add.media.file.page"));
const AdminMediaFilePage = lazy(() => import("../pages/admin/media.files/media.file.page"));
const AdminMediaFilesPage = lazy(() => import("../pages/admin/media.files/media.files.page"));
const EditGroupPage = lazy(() => import("../pages/admin/groups/edit.group.page"));
const AddGroupPage = lazy(() => import("../pages/admin/groups/add.group.page"));
const AdminGroupPage = lazy(() => import("../pages/admin/groups/group.page"));
const AdminGroupsPage = lazy(() => import("../pages/admin/groups/groups.page"));
const EditAboutPage = lazy(() => import("../pages/admin/about/edit.about.page"));
const AdminAboutPage = lazy(() => import("../pages/admin/about/about.page"));
const EditLessonPage = lazy(() => import("../pages/admin/lessons/edit.lesson.page"));
const AddLessonPage = lazy(() => import("../pages/admin/lessons/add.lesson.page"));
const AdminLessonsPage = lazy(() => import("../pages/admin/lessons/lessons.page"));
const AdminLessonPage = lazy(() => import("../pages/admin/lessons/lesson.page"));
const AdminModePage = lazy(() => import("../pages/admin/mode/mode.page"));
const AdminModesPage = lazy(() => import("../pages/admin/mode/modes.page"));
const EditFoodPage = lazy(() => import("../pages/admin/food/edit.food.page"));
const AddFoodPage = lazy(() => import("../pages/admin/food/add.food.page"));
const AdminFoodsPage = lazy(() => import("../pages/admin/food/foods.page"));
const AdminFoodPage = lazy(() => import("../pages/admin/food/food.page"));
const EditCategoryEmployeesPage = lazy(() => import("../pages/admin/employees/category/edit.category.employees.page"));
const AddCategoryEmployeesPage = lazy(() => import("../pages/admin/employees/category/add.category.employees.page"));
const EditEmployeePage = lazy(() => import("../pages/admin/employees/edit.employee.page"));
const AddEmployeePage = lazy(() => import("../pages/admin/employees/add.employee.page"));
const AdminEmployeePage = lazy(() => import("../pages/admin/employees/employee.page"));
const AdminEmployeesPage = lazy(() => import("../pages/admin/employees/employees.page"));

const RoutesList = () => {
    const menu = menuStore.value.all.filter(item => item.custom_page === 1);

    const customRoutes = React.useMemo(() => {
        return (
            <>
                {
                    menu.map(item =>
                        <Route
                            exact={true}
                            key={item.title}
                            path={GenerateUrl(item.title)}
                            element={<CustomPage id={item.ID} />}
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
            <Route path='/сотрудники'>
                <Route index element={<EmployeesPage />} />
                <Route path=':id' element={<EmployeePage />} />
            </Route>
            <Route path='/питание' exact={true} element={<FoodPage />} />
            <Route path='/контакты' exact={true} element={<ContactsPage />} />
            <Route path='/задать-вопрос' exact={true} element={<SupportPage />} />
            <Route path='/о-нас' exact={true} element={<AboutPage />} />
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
