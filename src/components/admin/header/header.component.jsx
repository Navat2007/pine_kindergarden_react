import React from "react";
import Button from "../../admin/button/button";
import ProfileHeader from "../profile.header/profile.header.component";
import "./header.scss";

const HeaderComponent = ({ children, handleBurger }) => {
    return (
        <header className='admin-header'>
            <Button
                type='button'
                theme='text'
                isIconBtn={true}
                iconClass='mdi mdi-menu'
                extraClass='{styles.burger}'
                aria-label='Открыть/Закрыть меню'
                onClick={handleBurger}
            />
            {children}
            <ProfileHeader />
        </header>
    );
};

export default HeaderComponent;
