import React from "react";
import "./footer.scss";
import Menu from "../menu/menu";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer__inner'>
                <Menu place={"footer"} logoPlace={"footer"} />
                <div className='footer__content'>
                    <p className='footer__author'>
                    ФГБДОУ &laquo;Центр развития ребенка&nbsp;&mdash; детский сад &laquo;Сосны&raquo; Все права защищены</p>
                    <NavLink to={"/login"} className={"footer__lk-link main-link"}>
                        Личный кабинет
                    </NavLink>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
