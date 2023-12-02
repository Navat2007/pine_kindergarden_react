import React from "react";
import { NavLink } from "react-router-dom";
import { AdminIcons } from "../../svgs";
import { GenerateUrl } from "../../../utils/generateUrl";
import classNames from "classnames";

const getMenuLink = (menu) => {
    if (menu.custom_page === 1) {
        return GenerateUrl(menu.title);
    } else if (menu.page === 1 && menu.custom_page === 0) {
        return menu.url;
    } else {
        return "";
    }
};

function MenuItem({ item }) {
    let className = ["header__menu-link"];

    return (
        <li>
            {item.external === 1 ? (
                <a href={item.url} target={"_blank"} className={className.join(" ")} rel='noreferrer'>
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
    const [submenuOpened, submenugerOpened] = React.useState(false);

    return (
        <li
            className={classNames({
                header__submenu: true,
                header__submenu_opened: submenuOpened,
            })}
            dataLevel='1'
        >
            <button
                className='header__menu-link header__submenu-button'
                type='button'
                aria-label='Развернуть список'
                onClick={() => submenugerOpened(!submenuOpened)}
            >
                {item.title}
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

const DropdownMenu = ({ items }) => {
    if (!items) return null;

    return items.map((item) => {
        if (item.submenu?.length > 0) return <DropdownItem key={item.title} item={item} items={item.submenu} />;

        return <MenuItem key={item.title} item={item} />;
    });
};

export default DropdownMenu;
