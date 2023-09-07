import React from "react";
import "./header.scss";
import Menu from "../menu/menu";
import Logo from "../logo/logo";

const Header = () => {
    return (
        <header className='header main-section section_type_fixed'>
            <div className='header__inner'>
                <Logo place={"header"} />
                <Menu place={"header"} />
                <button type='button' className='burger' aria-label='Свернуть/Развернуть меню'>
                    <div></div>
                </button>
            </div>
        </header>
    );
};

export default Header;
