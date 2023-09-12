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
            title: "Новости",
            icon: MenuIcons.news,
            link: "/admin/news",
        },
    ];

    const handleBurgerMenu = () => {
        setBurgerOpened(!burgerOpened);
    };

    return (
        <div className='app'>
            <Menu menu={menu} burgerOpened={burgerOpened} setBurgerOpened={handleBurgerMenu} />
            <main className='app__main'>
                <Header extraClass={'app__header'} handleBurger={handleBurgerMenu} />
                <div className='app__content'>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
