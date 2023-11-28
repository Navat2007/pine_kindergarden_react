import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/admin/header/header.component";
import Menu from "../components/admin/menu/menu.component";

import { MenuIcons } from "../components/svgs.js";
import "../styles/admin.layout.scss";

const AdminLayout = () => {
    const [burgerOpened, setBurgerOpened] = React.useState(false);
    const menu = [
        {
            title: "Пользователи",
            icon: MenuIcons.users,
            link: "/admin/users",
        },
        {
            title: "Файлы",
            icon: MenuIcons.media,
            link: "/admin/mediaFiles",
        },
        {
            title: "Меню",
            icon: MenuIcons.menu,
            link: "/admin/menu",
        },
        {
            title: "Cтраницы",
            icon: MenuIcons.user_pages,
            link: "/admin/customPages",
        },
        {
            title: "separator",
            separator: true,
        },
        {
            title: "Документы",
            icon: MenuIcons.documents,
            link: "/admin/documents",
        },
        {
            title: "Платные услуги",
            icon: MenuIcons.lessons,
            link: "/admin/lessons",
        },
        {
            title: "Сотрудники",
            icon: MenuIcons.employers,
            link: "/admin/employees",
        },
        {
            title: "Группы",
            icon: MenuIcons.groups,
            link: "/admin/groups",
        },
        {
            title: "Питание",
            icon: MenuIcons.food,
            link: "/admin/food",
        },
        // {
        //     title: "Режим",
        //     icon: MenuIcons.mode,
        //     link: "/admin/mode",
        // },
        {
            title: "Новости",
            icon: MenuIcons.news,
            link: "/admin/news",
        },
        {
            title: "О нас",
            icon: MenuIcons.company,
            link: "/admin/about",
        },
    ];

    const handleBurgerMenu = () => {
        setBurgerOpened(!burgerOpened);
    };

    return (
        <div className='app'>
            <Menu menu={menu} burgerOpened={burgerOpened} setBurgerOpened={handleBurgerMenu} />
            <main className='app__main'>
                <Header extraClass={"app__header"} handleBurger={handleBurgerMenu} />
                <div className='app__content'>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
