import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import useAuthStore from "../store/authStore";

import useOnClickOutside from "../hook/onClickOutside";

import styles from "./public.module.scss";
import logo from "../images/logo.png";
import logoFooter from "../images/logo__footer.svg";
import { AdminIcons } from "../components/svgs.js";

const PublicLayout = () => {
    const { user } = useAuthStore();
    const location = useLocation();
    const node = React.useRef();

    const [burgerOpened, setBurgerOpened] = React.useState(false);

    React.useEffect(() => {
        window.scrollTo(0, 0);
        setBurgerOpened(false);
    }, [location]);

    useOnClickOutside(node, () => {
        if (burgerOpened) {
            setBurgerOpened(!burgerOpened);
        }
    });

    const menu = [
        {
            ext: false,
            url: "/news/",
            title: "Новости",
            submenu: [],
        },
    ];

    function DropdownMenu({ items }) {
        return items.map((item) => {
            if (item.submenu.length > 0) return <DropdownItem key={item.title} item={item} items={item.submenu} />;

            return <MenuItem key={item.title} item={item} />;
        });
    }

    function MenuItem({ item }) {
        let className = [styles.menuLink];

        if (location.pathname.includes(item.url)) {
            className.push(styles.menuLink_actived);
        }

        return (
            <li>
                {item.ext ? (
                    <a href={item.url} target={"_blank"} className={className.join(" ")}>
                        {item.title}
                    </a>
                ) : (
                    <NavLink to={item.url} className={className.join(" ")}>
                        {item.title}
                    </NavLink>
                )}
            </li>
        );
    }

    function DropdownItem({ item, items }) {
        const [opened, setOpened] = React.useState(false);
        const liRef = React.useRef();

        useOnClickOutside(liRef, () => {
            if (opened) {
                setOpened(!opened);
            }
        });

        return (
            <li ref={liRef}>
                <a
                    className={[styles.menuLink, opened ? styles.menuLinkOpened : ""].join(" ")}
                    onClick={() => {
                        setOpened(!opened);
                    }}
                >
                    {item.title}
                    <span className={styles.dropDownArrow}>{AdminIcons.chevron_down}</span>
                </a>
                <div className={styles.dropDownMenu}>
                    <ul className={[styles.dropDownMenuList, opened ? styles.dropDownMenuListOpened : ""].join(" ")}>
                        <DropdownMenu items={items} />
                    </ul>
                </div>
            </li>
        );
    }

    return (
        <>
            <div className={styles.content}>
                <header className={styles.header}>
                    <div className={styles.headerWrap}>
                        <NavLink className={styles.headerLogo} to={"/"}>
                            <img src={logo} alt='Логотип Содружества' />
                        </NavLink>
                        <nav ref={node} className={[styles.menu, styles.menuPlaceHeader].join(" ")}>
                            <ul className={[styles.menuList, burgerOpened ? styles.menuListOpened : ""].join(" ")}>
                                <DropdownMenu items={menu} />
                            </ul>
                            <button
                                className={[styles.hamburger, burgerOpened ? styles.hamburgerOpened : ""].join(" ")}
                                type='button'
                                aria-label='Мобильное меню'
                                onClick={() => setBurgerOpened(!burgerOpened)}
                            >
                                <div />
                            </button>
                        </nav>
                    </div>
                </header>
                <main className={styles.main}>
                    <Outlet />
                </main>
                <footer className={styles.footer}>
                    <div className={styles.footerWrap}>
                        <div className={styles.footerColumns}>
                            <div className={[styles.footerColumn, styles.footerColumnContentContact].join(" ")}>
                                <h2 className={styles.footerColumnHeading}>Контакты</h2>
                                {/*<a*/}
                                {/*    className={styles.link}*/}
                                {/*    href="tel:84956926572"*/}
                                {/*    rel="nofollow noopener noreferer"*/}
                                {/*>*/}
                                {/*    <span className={styles.linkIcon}>*/}
                                {/*        {AdminIcons.phone}*/}
                                {/*    </span>{" "}*/}
                                {/*    +7 (495) 692-65-72*/}
                                {/*</a>*/}
                                <a
                                    className={styles.link}
                                    href='mailto:sodruzhestvotheatre@edu.mos.ru'
                                    rel='nofollow noopener noreferer'
                                >
                                    <span className={styles.linkIcon}>{AdminIcons.email}</span>{" "}
                                    sodruzhestvo&shy;theatre@edu.mos.ru
                                </a>
                                <NavLink
                                    to={user ? (user.role === "user" ? "/user/my_school" : "/admin/users") : "/login/"}
                                    className={styles.loginLink}
                                >
                                    Войти в Личный кабинет
                                </NavLink>
                            </div>
                            <div className={[styles.footerColumn, styles.footerColumnContentNavigation].join(" ")}>
                                <h2 className={styles.footerColumnHeading}>Меню</h2>
                                <nav className={[styles.menu, styles.menuPlaceFooter].join(" ")}>
                                    <ul className={styles.menuList}>
                                        {menu.map((item) => (
                                            <li key={item.title}>
                                                {item.ext ? (
                                                    <a href={item.url} target={"_blank"} className={styles.menuLink}>
                                                        {item.title}
                                                    </a>
                                                ) : (
                                                    <NavLink to={item.url} className={styles.menuLink}>
                                                        {item.title}
                                                    </NavLink>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className={styles.footerCopyBlock}>
                            <a
                                className={styles.footerCopy}
                                href={"https://patriotsport.moscow/"}
                                target={"_blank"}
                                rel={"roopener nofollow noreferer"}
                            >
                                © 2023г. «Московский центр «Патриот.Спорт»
                            </a>
                            <a href={"https://shkolamoskva.ru/"} target={"_blank"} rel={"roopener nofollow noreferer"}>
                                <img className={styles.footerLogo} src={logoFooter} alt='Школа.Москва' />
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default PublicLayout;
