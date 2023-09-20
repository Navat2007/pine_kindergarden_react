import React from "react";
import { NavLink } from "react-router-dom";

import "./logo.scss";
import logo from "../../../images/logo.svg";

const Logo = ({ place }) => {
    return (
        <NavLink
            to={"/"}
            className={`logo ${place && `logo_place_${place}`}`}
            rel='noreferer nofollow noopener'
            aria-label={"Главная страница"}
        >
            <img src={logo} loading='lazy' alt='Векторное изображение трех сосен с надписью - Сосны' />
        </NavLink>
    );
};

export default Logo;
