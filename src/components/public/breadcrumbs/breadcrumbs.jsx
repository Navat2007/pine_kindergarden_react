import React from "react";
import { motion } from "framer-motion";
import {NavLink} from "react-router-dom";

import "./breadcrumbs.scss";

const Breadcrumbs = ({ items = [] }) => {
    return (
        <motion.nav
            className='breadcrumbs'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
        >
            <ul className='breadcrumbs__list'>
                {items.map((item) => (
                    <li
                        key={window.global.makeid(8)}
                        className='breadcrumbs__item'
                    >
                        {item.url === "" ? (
                            <a className={'breadcrumbs__link'}>{item.title}</a>
                        ) : (
                            <NavLink
                                className={'breadcrumbs__link'}
                                to={item.url}
                            >
                                {item.title}
                            </NavLink>
                        )}
                    </li>
                ))}
            </ul>
        </motion.nav>
    );
};

export default Breadcrumbs;
