import React from "react";
import { motion } from "framer-motion";
import "./breadcrumbs.scss";

const Breadcrumbs = () => {
    return (
        <motion.nav
            className='breadcrumbs'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
        >
            <ul class='breadcrumbs__list'>
                <li class='breadcrumbs__item'>
                    <a class='breadcrumbs__link' href='./'>
                        Главная
                    </a>
                </li>
                <li class='breadcrumbs__item'>
                    <a class='breadcrumbs__link' href='/'>
                        Занятия
                    </a>
                </li>
                <li class='breadcrumbs__item'>
                    {/* У последней нет атрибута href, т.к. он активный и чтобы не было выделения и нельзя было перезагрузить страницу */}
                    <a class='breadcrumbs__link'>Шахматы</a>
                </li>
            </ul>
        </motion.nav>
    );
};

export default Breadcrumbs;
