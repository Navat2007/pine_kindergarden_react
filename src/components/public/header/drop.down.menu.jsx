import { NavLink } from "react-router-dom";
import { AdminIcons } from "../../svgs";
import React from "react";
import { GenerateUrl } from "../../../utils/generateUrl";

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
                <a href={item.url} target={"_blank"} className={className.join(" ")} rel="noreferrer">
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
            <button className='header__menu-link header__submenu-button' type='button' aria-label='Развернуть список'>
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

const DropdownMenu = ({ items }) => {
    if (!items) return null;

    return items.map((item) => {
        if (item.submenu?.length > 0) return <DropdownItem key={item.title} item={item} items={item.submenu} />;

        return <MenuItem key={item.title} item={item} />;
    });
};

export default DropdownMenu;
