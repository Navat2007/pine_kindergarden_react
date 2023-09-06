import React from "react";
import "./footer.scss";
import Menu from "../menu/menu";

const Footer = () => {
    return (
        <footer className='footer section section_type_fixed'>
            <div className='footer__wrap'>
                <Menu place={"footer"} logoPlace={"footer"} />
                <p className='footer__author'>Детский&nbsp;сад&nbsp;СОСНЫ Все&nbsp;права&nbsp;защищены</p>
            </div>
        </footer>
    );
};

export default Footer;
