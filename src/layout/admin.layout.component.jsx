import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/header/header.component";
import Menu from "../components/menu/menu.component";
import SupportHeaderComponent from "../components/header/support.header.component";
import ProfileHeader from "../components/header/profile.header.component";
import { MenuIcons } from "../components/svgs.js";
import styles from "./admin.module.scss";

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
        <div className={styles.content}>
            <Header handleBurger={handleBurgerMenu}>
                <SupportHeaderComponent />
                <ProfileHeader />
            </Header>
            <Menu
                menu={menu}
                burgerOpened={burgerOpened}
                setBurgerOpened={handleBurgerMenu}
            />
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
