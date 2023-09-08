import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/general/header/header.component";
import Menu from "../components/general/menu/menu.component";
import SupportHeaderComponent from "../components/general/header/support.header.component";
import ProfileHeader from "../components/general/header/profile.header.component";
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
        <div>
            <Header handleBurger={handleBurgerMenu}>
                <SupportHeaderComponent />
                <ProfileHeader />
            </Header>
            <Menu menu={menu} burgerOpened={burgerOpened} setBurgerOpened={handleBurgerMenu} />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
