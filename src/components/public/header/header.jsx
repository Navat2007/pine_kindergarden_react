import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { signal } from "@preact/signals-react";
import classNames from "classnames";

import useWindowSize from "../../../hook/useWindowSize";
import useOnClickOutside from "../../../hook/onClickOutside";

import { menuStore } from "../../../store/public/menuStore";

import DropdownMenu from "./drop.down.menu";

import Logo from "../logo/logo";
import "./header.scss";

const menuItems = signal([]);
const menuMobileItems = signal([]);
const mobileMenuItemsWidths = signal([]);

const Header = () => {
    const location = useLocation();
    const [width, height] = useWindowSize();

    const node = React.useRef();
    const button = React.useRef();
    const menuList = React.useRef();
    const mobileMenu = React.useRef();
    const mobileMenuList = React.useRef();
    const stickyHeader = React.useRef();

    const [burgerOpened, setBurgerOpened] = React.useState(false);

    useOnClickOutside([node, button], (e) => {
        if (burgerOpened) {
            setBurgerOpened(!burgerOpened);
        }
    });

    React.useLayoutEffect(() => {
        setBurgerOpened(false);
    }, [location]);

    React.useEffect(() => {
        let fixedTop = stickyHeader.current.offsetTop;

        const stickyHeaderEvent = () => {
            if (window.pageYOffset > fixedTop) {
                stickyHeader.current.classList.add("header_sticky");
            } else {
                stickyHeader.current.classList.remove("header_sticky");
            }
        };

        window.addEventListener("scroll", stickyHeaderEvent);

        return () => {
            window.removeEventListener("scroll", stickyHeaderEvent);
        };
    }, []);

    React.useEffect(() => {
        let offset = 40;
        let availableSpace = menuList.current.getBoundingClientRect().width;
        let requiredSpace =
            Object.values(menuList.current.childNodes).reduce((total, children) => total + children.offsetWidth, 0) +
            offset;

        if (requiredSpace > availableSpace) {
            for (let i = menuList.current.childNodes.length - 1; i >= 0; i--) {
                const elementWidth = menuList.current.childNodes[i].offsetWidth;

                menuMobileItems.value.unshift(menuItems.value.pop());
                mobileMenuItemsWidths.value.unshift(elementWidth);

                requiredSpace -= elementWidth;

                if (availableSpace > requiredSpace) break;
            }
        } else if (
            mobileMenuItemsWidths.value.length > 0 &&
            availableSpace > mobileMenuItemsWidths.value[0] + requiredSpace
        ) {
            menuItems.value.push(menuMobileItems.value.shift());
            mobileMenuItemsWidths.value.shift();
        }
    }, [width]);

    React.useEffect(() => {
        menuItems.value = menuStore.value.sorted;
    }, [menuStore.value]);

    return (
        <motion.header
            ref={stickyHeader}
            className='header'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
        >
            <div className='header__inner'>
                <Logo extraClass={"header__logo"} />
                <menu className='header__menu'>
                    <ul className={`header__menu-list`} ref={menuList}>
                        <DropdownMenu items={menuItems.value} />
                    </ul>
                    <div
                        className={classNames({
                            header__submenu: true,
                            header__submenu_opened: burgerOpened,
                        })}
                        ref={mobileMenu}
                        data-level='1'
                    >
                        <button
                            ref={button}
                            type='button'
                            className='header__burger-button'
                            aria-label='Свернуть/Развернуть меню'
                            onClick={() => {
                                setBurgerOpened(!burgerOpened);
                            }}
                        >
                            <div></div>
                        </button>
                        <div className='header__submenu-list-container' ref={node}>
                            <ul className='header__submenu-list' ref={mobileMenuList}>
                                <DropdownMenu items={menuMobileItems.value} level={1}/>
                            </ul>
                        </div>
                    </div>
                </menu>
            </div>
        </motion.header>
    );
};

export default Header;
