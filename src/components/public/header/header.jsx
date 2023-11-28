import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import {motion} from "framer-motion";
import {GenerateUrl} from "../../../utils/generateUrl";
import classNames from "classnames";

import {menuStore} from "../../../store/public/menuStore";

import OverflowMenuWrapper from "../overflow.menu.wrapper/overflow.menu.wrapper";
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

        const stickyHeaderEvent = () => {
            if (window.pageYOffset > fixedTop) {
                header.classList.add("header_sticky");
            } else {
                header.classList.remove("header_sticky");
            }
        };
        window.addEventListener("scroll", stickyHeaderEvent);
    }, []);

    const getMenuLink = (menu) => {
        if (menu.custom_page === 1) {
            return GenerateUrl(menu.title);
        } else if (menu.page === 1 && menu.custom_page === 0) {
            return menu.url;
        } else {
            return "";
        }
    }

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
            <li className={"menu__item"}>
                {item.page === 2 ? (
                    <a href={item.url} target={"_blank"} className={className.join(" ")}>
                        {item.title}
                    </a>
                ) : (
                    <NavLink to={getMenuLink(item)} className={({isActive}) => {
                        if (isActive) className.push("menu__link_active");
                        return className.join(" ");
                    }}>
                        {item.title}
                    </NavLink>
                )}
            </li>
        );
    }

    function DropdownItem({item, items}) {
        return (
            <li className='menu__item menu__item_has-submenu submenu'>
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
                <nav className={classNames({
                    'menu': true,
                    'menu_opened': burgerOpened
                })}>
                    <Logo extraClass={"header__logo header__logo_place_menu"}/>
                    <OverflowMenuWrapper>
                        {menuStore.value?.sorted?.length > 0
                            && <DropdownMenu items={menuStore.value.sorted}/>}
                    </OverflowMenuWrapper>
                </nav>
                <button
                    ref={button}
                    type='button'
                    className={classNames({
                        'header__burger': true,
                        'header__burger_opened': burgerOpened
                    })}
                    aria-label='Свернуть/Развернуть меню'
                    onClick={() => {
                        setBurgerOpened(!burgerOpened);
                    }}
                >
                    <div></div>
                </button>
            </div>
        </motion.header>
    );
};

export default Header;
