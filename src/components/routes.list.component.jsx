import React, {lazy, Suspense} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {userStore} from "../store/userStore";
import {menuStore} from "../store/public/menuStore";

import {GenerateUrl} from "../utils/generateUrl";

import Preloader from "./public/preloader/preloader.component";
import Page404 from "../pages/404/404.page";
import LoginPage from "../pages/login/login.page";

import PublicLayout from "../layout/public.layout.component";
import AdminLayout from "../layout/admin.layout.component";

// PUBLIC PAGES
const IndexPage = lazy(() => import("../pages/public/index.page"));
const LessonsPage = lazy(() => import("../pages/public/lessons/lessons.page"));
const LessonPage = lazy(() => import("../pages/public/lessons/lesson.page"));
const DocumentsPage = lazy(() => import("../pages/public/documents/documents.page"));
const EmployeesPage = lazy(() => import("../pages/public/employees/employees.page"));
const EmployeePage = lazy(() => import("../pages/public/employees/employee.page"));
const FoodPage = lazy(() => import("../pages/public/food/food.page"));
const AllNewsPage = lazy(() => import("../pages/public/news/all.news.page"));
const NewsPage = lazy(() => import("../pages/public/news/news.page"));
const CustomPage = lazy(() => import("../pages/public/custom/custom.page"));
const ContactsPage = lazy(() => import("../pages/public/contacts/contacts.page"));
const GroupsPage = lazy(() => import("../pages/public/groups/groups.page"));
const GroupPage = lazy(() => import("../pages/public/groups/group.page"));
const SupportPage = lazy(() => import("../pages/public/support/support.page"));
const AboutPage = lazy(() => import("../pages/public/about/about.page"));

// ADMIN PAGES
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
const CustomPagesPage = lazy(() => import("../pages/admin/custom.pages/custom.pages.page"));
const EditCustomPagesPage = lazy(() => import("../pages/admin/custom.pages/edit.custom.pages.page"));

const RoutesList = () => {
    const menu = menuStore.value.all.filter(item => item.custom_page === 1);

    const customRoutes = React.useMemo(() => {
        return (
            <>
                {
                    menu.map(item =>
                        <Route
                            key={item.title}
                            path={GenerateUrl(item.title)}
                            element={<CustomPage id={item.ID}/>}
                        />
                    )
                }
            </>
        )
    }, [menu]);

    const publicRoutes = (
        <Route path='/' element={<PublicLayout/>}>
            <Route index element={<IndexPage/>}/>
            <Route path='/платные-услуги'>
                <Route index element={<LessonsPage/>}/>
                <Route path=':id' element={<LessonPage/>}/>
            </Route>
            <Route path='/документы' exact={true} element={<DocumentsPage/>}/>
            <Route path='/сотрудники'>
                <Route index element={<EmployeesPage/>}/>
                <Route path=':id' element={<EmployeePage/>}/>
            </Route>
            <Route path='/employees'>
                <Route index element={<EmployeesPage/>}/>
                <Route path=':id' element={<EmployeePage/>}/>
            </Route>
            <Route path='/питание' exact={true} element={<FoodPage/>}/>
            <Route path='/food' exact={true} element={<FoodPage/>}/>
            <Route path='/контакты' exact={true} element={<ContactsPage/>}/>
            <Route path='/задать-вопрос' exact={true} element={<SupportPage/>}/>
            <Route path='/о-нас' exact={true} element={<AboutPage/>}/>
            <Route path='/группы' exact={true} element={<GroupsPage/>}/>
            <Route path='/группы/:id' exact={true} element={<GroupPage/>}/>
            <Route path='/новости'>
                <Route index element={<AllNewsPage/>}/>
                <Route path=':id' element={<NewsPage/>}/>
            </Route>
            <Route path='/news'>
                <Route index element={<AllNewsPage/>}/>
                <Route path=':id' element={<NewsPage/>}/>
            </Route>
            {customRoutes}
        </Route>
    );

    const adminRoutes = (
        <Suspense fallback={<Preloader loading={true} />}>
            <Routes>
                <Route path='/admin' element={<AdminLayout/>}>
                    <Route path='users'>
                        <Route index element={<UsersPage/>}/>
                        <Route path='edit/:id' element={<EditUserPage/>}/>
                        <Route path='new' element={<AddUserPage/>}/>
                    </Route>
                    <Route path='mediaFiles'>
                        <Route index element={<AdminMediaFilesPage/>}/>
                        <Route path=':id' element={<AdminMediaFilePage/>}/>
                        <Route path='new' element={<AddMediaFilePage/>}/>
                        <Route path='edit/:id' element={<EditMediaFilePage/>}/>
                    </Route>
                    <Route path='menu'>
                        <Route index element={<MenuPage/>}/>
                        <Route path='new/:id/:sorting' element={<AddMenuPage/>}/>
                        <Route path='edit/:id' element={<EditMenuPage/>}/>
                    </Route>
                    <Route path='customPages'>
                        <Route index element={<CustomPagesPage/>}/>
                        <Route path=':id' element={<EditCustomPagesPage/>}/>
                    </Route>
                    <Route path='news'>
                        <Route index element={<AdminAllNewsPage/>}/>
                        <Route path=':id' element={<AdminNewsPage/>}/>
                        <Route path='new' element={<AddNewsPage/>}/>
                        <Route path='edit/:id' element={<EditNewsPage/>}/>
                    </Route>
                    <Route path='documents'>
                        <Route index element={<AdminDocumentsPage/>}/>
                        <Route path=':id' element={<ViewDocumentPage/>}/>
                        <Route path='new' element={<AddDocumentPage/>}/>
                        <Route path='edit/:id' element={<EditDocumentPage/>}/>
                    </Route>
                    <Route path='employees'>
                        <Route index element={<AdminEmployeesPage/>}/>
                        <Route path=':id' element={<AdminEmployeePage/>}/>
                        <Route path='new' element={<AddEmployeePage/>}/>
                        <Route path='edit/:id' element={<EditEmployeePage/>}/>
                        <Route path='category/new' element={<AddCategoryEmployeesPage/>}/>
                        <Route path='category/edit/:id' element={<EditCategoryEmployeesPage/>}/>
                    </Route>
                    <Route path='food'>
                        <Route index element={<AdminFoodsPage/>}/>
                        <Route path='menu/:id' element={<AdminFoodPage/>}/>
                        <Route path='menu/new' element={<AddFoodPage/>}/>
                        <Route path='menu/edit/:id' element={<EditFoodPage/>}/>
                    </Route>
                    <Route path='mode'>
                        <Route index element={<AdminModesPage/>}/>
                        <Route path=':id' element={<AdminModePage/>}/>
                        <Route path='new' element={<AdminModePage/>}/>
                    </Route>
                    <Route path='lessons'>
                        <Route index element={<AdminLessonsPage/>}/>
                        <Route path=':id' element={<AdminLessonPage/>}/>
                        <Route path='new' element={<AddLessonPage/>}/>
                        <Route path='edit/:id' element={<EditLessonPage/>}/>
                    </Route>
                    <Route path='about'>
                        <Route index element={<AdminAboutPage/>}/>
                        <Route path='edit' element={<EditAboutPage/>}/>
                    </Route>
                    <Route path='groups'>
                        <Route index element={<AdminGroupsPage/>}/>
                        <Route path=':id' element={<AdminGroupPage/>}/>
                        <Route path='new' element={<AddGroupPage/>}/>
                        <Route path='edit/:id' element={<EditGroupPage/>}/>
                    </Route>
                </Route>
                <Route path='/profile' exact={true} element={<AdminLayout/>}>
                    <Route index element={<ProfilePage/>}/>
                </Route>
                <Route path='/login' exact={true} element={<Navigate to='/admin/users'/>}/>
                {publicRoutes}
                <Route path='*' element={<LoginPage />}/>
            </Routes>
        </Suspense>
    );

    if (userStore.value && (userStore.value.role === "admin" || userStore.value.role === "superadmin")) {
        return adminRoutes;
    }

    return (
        <Suspense fallback={<Preloader loading={true} />}>
            <Routes>
                {publicRoutes}
                <Route path='/login' exact={true} element={<LoginPage/>}/>
                <Route path='*' element={<Page404/>}/>
            </Routes>
        </Suspense>
    );
};

export default RoutesList;
