import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { GenerateUrl } from "../../../utils/generateUrl";
import classNames from "classnames";

import { menuStore } from "../../../store/public/menuStore";

import useOnClickOutside from "../../../hook/onClickOutside";
import Logo from "../logo/logo";
import { AdminIcons } from "../../svgs";

import "./header.scss";
import {computed, signal, useSignalEffect} from "@preact/signals-react";

const Header = () => {
    const location = useLocation();

    const node = React.useRef();
    const button = React.useRef();
    const menuList = React.useRef();
    const mobileMenu = React.useRef();
    const mobileMenuList = React.useRef();
    const stickyHeader = React.useRef();

    const menuItems = signal([])
    const menuMobileItems = signal([])

    const numberOfItems = signal(0);
    const totalSpace = signal(0);
    const breakWidths = signal([]);
    const availableSpace = signal(0);
    const numOfVisibleItems = signal(0);
    const requiredSpace = signal(0);

    const isBurgerOpened = signal(false);

    function checkMenuSize() {
        availableSpace = menuList.current.getBoundingClientRect().width;
        numOfVisibleItems = menuList.current.children.length;
        requiredSpace = breakWidths[numOfVisibleItems - 1];

        if (requiredSpace > availableSpace) {
            menuMobileItems.value.unshift(menuItems.value.pop());
            numOfVisibleItems -= 1;
            checkMenuSize();
        } else if (availableSpace > breakWidths[numOfVisibleItems]) {
            menuItems.value.push(menuMobileItems.value.shift());
            numOfVisibleItems += 1;
        }

        // mobileMenu.current.setAttribute("count", numberOfItems - numOfVisibleItems);
        // if (numOfVisibleItems === numberOfItems) mobileMenu.current.classList.add("visually-hidden");
        // else mobileMenu.current.classList.remove("visually-hidden");
    }

    useOnClickOutside([node, button], (e) => {
        if (isBurgerOpened.value) {
            console.log("outside");
            isBurgerOpened.value = !isBurgerOpened.value;
        }
    });

    React.useLayoutEffect(() => {
        isBurgerOpened.value = false;
    }, [location]);

    React.useEffect(() => {
        let fixedTop = stickyHeader.current.offsetTop;

        Array.from(menuList.current.children).map((children) => {
            totalSpace.value += children.getBoundingClientRect().width;
            numberOfItems.value += 1;
            breakWidths.value.push(totalSpace);
        });

        const stickyHeaderEvent = () => {
            if (window.pageYOffset > fixedTop) {
                stickyHeader.current.classList.add("header_sticky");
            } else {
                stickyHeader.current.classList.remove("header_sticky");
            }
        };
        window.addEventListener("scroll", stickyHeaderEvent);
        window.addEventListener("resize", checkMenuSize);

        return () => {
            window.removeEventListener("scroll", stickyHeaderEvent);
            window.removeEventListener("resize", checkMenuSize);
        }
    }, []);

    useSignalEffect(() => {
        menuItems.value = menuStore.value.sorted;

    }, [menuStore]);

    const getMenuLink = (menu) => {
        if (menu.custom_page === 1) {
            return GenerateUrl(menu.title);
        } else if (menu.page === 1 && menu.custom_page === 0) {
            return menu.url;
        } else {
            return "";
        }
    };

    function DropdownMenu({ items }) {
        if (!items) return null;

        return items.map((item) => {
            if (item.submenu?.length > 0) return <DropdownItem key={item.title} item={item} items={item.submenu} />;

            return <MenuItem key={item.title} item={item} />;
        });
    }

    function MenuItem({ item }) {
        let className = ["header__menu-link"];

        return (
            <li>
                {item.page === 2 ? (
                    <a href={item.url} target={"_blank"} className={className.join(" ")}>
                        {item.title}
                    </a>
                ) : (
                    <NavLink
                        to={getMenuLink(item)}
                        className={({ isActive }) => {
                            if (isActive) className.push("header__menu-link_active");
                            return className.join(" ");
                        }}
                    >
                        {item.title}
                    </NavLink>
                )}
            </li>
        );
    }

    function DropdownItem({ item, items }) {
        return (
            <li className='header__submenu'>
                <button className='header__submenu-button' type='button' aria-label='Развернуть список'>
                    <span className='header__submenu-button-text'>{item.title}</span>
                    <span className='header__submenu-button-icon'>{AdminIcons.chevron_down}</span>
                </button>
                <div className='header__submenu-list-container'>
                    <ul className='header__submenu-list'>
                        <DropdownMenu items={items} />
                    </ul>
                </div>
            </li>
        );
    }

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
                            "header__mobile-menu": true,
                            "header__mobile-menu_opened": isBurgerOpened.value,
                        })}
                        ref={mobileMenu}
                    >
                        <button
                            ref={button}
                            type='button'
                            className='header__mobile-button'
                            aria-label='Свернуть/Развернуть меню'
                            onClick={() => {
                                isBurgerOpened.value = !isBurgerOpened.value;
                                console.log(isBurgerOpened.value);
                            }}
                        >
                            <div></div>
                        </button>
                        <div className='header__mobile-menu-container'>
                            <ul className='header__mobile-menu-list' ref={mobileMenuList}>
                                <DropdownMenu items={menuMobileItems.value} />
                            </ul>
                        </div>
                    </div>
                </menu>
            </div>
        </motion.header>
    );
};

export default Header;

{
    /*

// Header menu for mobile
const menuList = document.querySelector('.header__menu-list');
const mobileMenu = document.querySelector('.header__drop-down-menu');
const mobileMenuList = document.querySelector('.header__drop-down-menu-list');

let numberOfItems = 0;
let totalSpace = 0;
let breakWidths = [];
let availableSpace, numOfVisibleItems, requiredSpace;
Array.from(menuList.children).map((children) => {
  totalSpace += children.getBoundingClientRect().width;
  numberOfItems += 1;
  breakWidths.push(totalSpace);
});

function checkMenuSize() {
  // Get instant state
  availableSpace = menuList.getBoundingClientRect().width;
  numOfVisibleItems = menuList.children.length;
  requiredSpace = breakWidths[numOfVisibleItems - 1];

  // There is not enought space
  if (requiredSpace > availableSpace) {
    mobileMenuList.prepend(menuList.children[menuList.children.length - 1]);
    mobileMenuList.firstElementChild
      .querySelector('a')
      .classList.remove('header__menu-link');
    mobileMenuList.firstElementChild
      .querySelector('a')
      .classList.add('header__drop-down-menu-link');
    numOfVisibleItems -= 1;
    checkMenuSize();
    // There is more than enough space
  } else if (availableSpace > breakWidths[numOfVisibleItems]) {
    menuList.append(mobileMenuList.children[0]);
    menuList.lastElementChild
      .querySelector('a')
      .classList.remove('header__drop-down-menu-link');
    menuList.lastElementChild
      .querySelector('a')
      .classList.add('header__menu-link');
    numOfVisibleItems += 1;
  }

  // Update the button accordingly
  mobileMenu.setAttribute('count', numberOfItems - numOfVisibleItems);
  if (numOfVisibleItems === numberOfItems)
    mobileMenu.classList.add('visually-hidden');
  else mobileMenu.classList.remove('visually-hidden');
}

window.addEventListener('resize', () => {
  checkMenuSize();
});
window.addEventListener('DOMContentLoaded', () => {
  checkMenuSize();
});


*/
}
