import React from "react";
import styles from "./popup.module.scss";
import { AdminIcons } from "../../svgs.js";

const Popup = ({
    opened = false,
    title,
    extraClass,
    children,
    buttons,
    onClose,
}) => {
    const handleBackgroundClick = (event) => {
        if (event.target === event.currentTarget && onClose) {
            onClose();
        }
    };

    const config = [
        styles.popup,
        opened ? styles.popup_opened : null,
        extraClass,
    ];

    const finalClassName = config.filter(Boolean).join(" ");

    return (
        <div
            className={finalClassName}
            onClick={(e) => handleBackgroundClick(e)}
        >
            <div className={styles.container}>
                <h2 className={styles.title}>{title}</h2>
                <button
                    type="button"
                    className={styles.close}
                    aria-label="Закрыть окно"
                    onClick={onClose}
                >
                    {AdminIcons.close}
                </button>
                <div className={styles.body}>{children}</div>
                {buttons && <div className={styles.controls}>{buttons}</div>}
            </div>
        </div>
    );
};

export default Popup;
