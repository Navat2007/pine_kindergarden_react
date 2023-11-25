import React from "react";
import { NavLink } from "react-router-dom";

import "./logo.scss";
import logo from "../../../images/logo.svg";

const Logo = ({ extraClass }) => {
    return (
        <NavLink to={"/"} className={`logo${extraClass && ` ${extraClass}`}`} rel='noreferrer nofollow noopener'>
            <img src={logo} loading='lazy' alt='Векторное изображение трех сосен с надписью - Сосны' />
        </NavLink>
    );
};

export default React.memo(Logo);
