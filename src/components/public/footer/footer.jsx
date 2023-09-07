import React from "react";
import "./footer.scss";
import Menu from "../menu/menu";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className='footer main-section section_type_fixed'>
            <div className='footer__inner'>
                <Menu place={"footer"} logoPlace={"footer"} />
                <div className='footer__content'>
                    <p className='footer__author'>Детский&nbsp;сад&nbsp;СОСНЫ Все&nbsp;права&nbsp;защищены</p>
                    <NavLink to={"/login"} className={"footer__lk-link main-link"}>
                        Личный кабинет
                    </NavLink>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
