import React from "react";
import "./logo.scss";
import logo from "../../../images/logo.svg";

const Logo = ({ place }) => {
    return (
        <a className={`logo ${place && `logo_place_${place}`}`} href='/' rel='noreferer nofollow noopener'>
            <img src={logo} alt='Векторное изображение трех сосен с надписью - Сосны' />
        </a>
    );
};

export default Logo;
