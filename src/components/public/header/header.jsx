import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import {motion} from "framer-motion";
import {GenerateUrl} from "../../../utils/generateUrl";
import classNames from "classnames";

import {menuStore} from "../../../store/public/menuStore";

import useOnClickOutside from "../../../hook/onClickOutside";
import Logo from "../logo/logo";
import {AdminIcons} from "../../svgs";

import "./header.scss";
import "./menu.scss";
import "./submenu.scss";

const Header = () => {
    const node = React.useRef();
    const button = React.useRef();
    const location = useLocation();
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

    React.useLayoutEffect(() => {
        const header = document.querySelector(".header");

        let fixedTop = stickyHeader.current.offsetTop;
        let numberOfItems = 0;
        let totalSpace = 0;
        let breakWidths = [];
        let availableSpace, numOfVisibleItems, requiredSpace;

        Array.from(menuList.current.children).map((children) => {
            totalSpace += children.getBoundingClientRect().width;
            numberOfItems += 1;
            breakWidths.push(totalSpace);
        });

        function checkMenuSize() {
            // Get instant state
            availableSpace = menuList.current.getBoundingClientRect().width;
            numOfVisibleItems = menuList.current.children.length;
            requiredSpace = breakWidths[numOfVisibleItems - 1];

            // There is not enought space
            if (requiredSpace > availableSpace) {
                mobileMenuList.current.prepend(menuList.current.children[menuList.current.children.length - 1]);
                mobileMenuList.current.firstElementChild
                    .querySelector('a')
                    .classList.remove('header__menu-link');
                mobileMenuList.current.firstElementChild
                    .querySelector('a')
                    .classList.add('header__drop-down-menu-link');
                numOfVisibleItems -= 1;
                checkMenuSize();
                // There is more than enough space
            } else if (availableSpace > breakWidths[numOfVisibleItems]) {
                menuList.current.append(mobileMenuList.current.children[0]);
                menuList.current.lastElementChild
                    .querySelector('a')
                    .classList.remove('header__drop-down-menu-link');
                menuList.current.lastElementChild
                    .querySelector('a')
                    .classList.add('header__menu-link');
                numOfVisibleItems += 1;
            }

            // Update the button accordingly
            mobileMenu.current.setAttribute('count', numberOfItems - numOfVisibleItems);
            if (numOfVisibleItems === numberOfItems)
                mobileMenu.current.classList.add('visually-hidden');
            else mobileMenu.current.classList.remove('visually-hidden');
        }

        const stickyHeaderEvent = () => {
            if (window.pageYOffset > fixedTop) {
                header.classList.add("header_sticky");
            } else {
                header.classList.remove("header_sticky");
            }
        };
        window.addEventListener("scroll", stickyHeaderEvent);
        window.addEventListener('resize', checkMenuSize);
        window.addEventListener('DOMContentLoaded', checkMenuSize);
    }, []);

    const getMenuLink = (menu) => {
        if (menu.custom_page === 1) {
            return GenerateUrl(menu.title);
        } else if (menu.page === 1 && menu.custom_page === 0) {
            return menu.url;
        } else {
            return "";
        }
    };

    function DropdownMenu({items}) {
        if (!items) return null;

        return items.map((item) => {
            if (item.submenu?.length > 0)
                return <DropdownItem key={item.title} item={item} items={item.submenu}/>;

            return <MenuItem key={item.title} item={item}/>;
        });
    }

    function MenuItem({item}) {
        let className = ["menu__link"];

        return (
            <li>
                {item.page === 2 ? (
                    <a href={item.url} target={"_blank"} className={className.join(" ")}>
                        {item.title}
                    </a>
                ) : (
                    <NavLink
                        to={getMenuLink(item)}
                        className={({isActive}) => {
                            if (isActive) className.push("menu__link_active");
                            return className.join(" ");
                        }}
                    >
                        {item.title}
                    </NavLink>
                )}
            </li>
        );
    }

    function DropdownItem({item, items}) {
        return (
            <li className='submenu'>
                <button className='submenu__button' type='button' aria-label='Развернуть список'>
                    <span className='submenu__button-text'>{item.title}</span>
                    <span className='submenu__button-icon'>{AdminIcons.chevron_down}</span>
                </button>
                <ul className='submenu__list'>
                    <DropdownMenu items={items}/>
                </ul>
            </li>
        );
    }

    return (
        <motion.header
            ref={stickyHeader}
            className='header'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{delay: 0.2, duration: 1}}
        >
            <div className='header__inner'>
                <Logo extraClass={"header__logo"}/>
                <menu
                    className={classNames({
                        menu: true,
                        menu_opened: burgerOpened,
                    })}
                >
                    <ul className={`menu__list`} ref={menuList}>
                        {menuStore.value?.sorted?.length > 0 && <DropdownMenu items={menuStore.value.sorted}/>}
                    </ul>
                    <div className='header__drop-down-menu' ref={mobileMenu}>
                        <button
                            ref={button}
                            type='button'
                            className={classNames({
                                header__burger: true,
                                header__burger_opened: burgerOpened,
                            })}
                            aria-label='Свернуть/Развернуть меню'
                            onClick={() => {
                                setBurgerOpened(!burgerOpened);
                            }}
                        >
                            <div></div>
                        </button>
                        <div className='header__drop-down-menu-container'>
                            <ul className='header__drop-down-menu-list' ref={mobileMenuList}></ul>
                        </div>
                    </div>
                </menu>
            </div>
        </motion.header>
    );
};

export default Header;


{ /*

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