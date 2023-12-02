import React from "react";
import Logo from "../logo/logo";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import "./footer.scss";

const Footer = () => {
    const node = React.useRef();

    return (
        <motion.footer
            className='footer'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
        >
            <div className='footer__inner'>
                <div className='footer__columns'>
                    <div className='footer__column footer__column_content_logo'>
                        <Logo extraClass='footer__logo' />
                    </div>
                    <nav className='footer__column footer__column_content_menu footer__menu'>
                        <ul className='footer__menu-list'>
                        </ul>
                    </nav>
                </div>
                <div className='footer__content'>
                    <p className='footer__author'>
                        ФГБДОУ &laquo;Центр развития ребенка&nbsp;&mdash; детский сад &laquo;Сосны&raquo; Все права
                        защищены
                    </p>
                    <NavLink to={"/login"} className={"footer__lk-link main-link"}>
                        Личный кабинет &rarr;
                    </NavLink>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
