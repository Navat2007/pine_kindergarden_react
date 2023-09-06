import React from 'react';
import { motion } from 'framer-motion';

import styles from './button.module.scss';

const Button = ({
    type = "submit",
    text,
    theme,
    size,
    extraClass,
    isIconBtn = false,
    iconClass,
    spinnerActive = false,
    ...rest
}) => {

    const config = [
        styles.button,
        isIconBtn ? styles.button_icon : null,
        theme ? styles["button_theme_" + theme] : styles.button_theme_primary,
        size ? styles["button_size_" + size] : null,
        extraClass,
        spinnerActive ? styles.button_loading : null,
    ];

    const finalClassName = config.filter(Boolean).join(' ');

    return (
        <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            type={type}
            className={finalClassName}
            {...rest}
        >
            {
                iconClass
                &&
                <span className={`${styles.mdi} ${iconClass}`} />
            }
            <span className={styles.button__text}>{text}</span>
            {
                spinnerActive
                &&
                <div className={styles.button__spinner}><div></div><div></div><div></div></div>
            }
        </motion.button>
    );
};

export default Button;