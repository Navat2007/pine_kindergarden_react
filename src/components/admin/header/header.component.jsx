import React from "react";
import Button from "../../admin/button/button.component";
import ProfileHeader from "../profile.header/profile.header.component";
import { AdminIcons } from "../../svgs.js";
import "./header.scss";

const HeaderComponent = ({ children, extraClass, handleBurger }) => {
    return (
        <header className={`admin-header ${extraClass && extraClass}`}>
            <Button
                type='button'
                isIconBtn
                extraClass='admin-header__burger'
                iconName={AdminIcons.menu}
                aria-label='Открыть/Закрыть меню'
                onClick={handleBurger}
            />
            {children}
            <ProfileHeader />
        </header>
    );
};

export default HeaderComponent;
