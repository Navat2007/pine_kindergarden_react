import React from "react";
import { NavLink } from "react-router-dom";
import _uniqueId from 'lodash/uniqueId';

import styles from "./breadcrumbs.module.scss";

const Breadcrumbs = ({ items = [] }) => {
    return (
        <ul className={styles.list} data-testid="breadcrumbs">
            {items.map((item) => (
                <li
                    key={_uniqueId('prefix-')}
                    className={styles.item}
                >
                    {item.url === "" ? (
                        <span className={styles.link}>{item.title}</span>
                    ) : (
                        <NavLink
                            className={styles.link}
                            to={item.url}
                        >
                            {item.title}
                        </NavLink>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default Breadcrumbs;
