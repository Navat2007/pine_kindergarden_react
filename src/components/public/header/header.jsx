import React from "react";

import Menu from "../menu/menu";
import Logo from "../logo/logo";

import "./header.scss";

const Header = () => {
    return (
        <header className='header section section_type_fixed'>
            <div className='header__inner'>
                <Logo place={"header"} />
                <Menu place={"header"} />
            </div>
        </header>
    );
};

export default Header;
