import React from "react";
import "./logo.scss";
import logo from "../../../images/logo.svg";
import {NavLink} from "react-router-dom";

const Logo = ({ place }) => {
    return (
        <NavLink
            to={"/"}
            className={`logo ${place && `logo_place_${place}`}`}
            rel='noreferer nofollow noopener'
            aria-label={"Главная страница"}
        >
            <img src={logo} alt='Векторное изображение трех сосен с надписью - Сосны' />
        </NavLink>
    );
};

export default Logo;
