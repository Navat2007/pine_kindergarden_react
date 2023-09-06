import React from "react";
import styles from "./notif.module.scss";
import { AdminIcons } from "../../svgs.js";

function Notif({
    opened,
    onClose,
    state = "info",
    title = "Внимание",
    text,
    extraClass,
    timerInSeconds = 0,
    buttons,
}) {
    if (timerInSeconds > 0) {
        setTimeout(() => {
            if (onClose) onClose();
            else opened = false;
        }, timerInSeconds * 1000);
    }

    const handleBackgroundClick = (event) => {
        if (event.target === event.currentTarget && onClose) {
            onClose();
        }
    };

    const config = [
        styles.notif,
        opened ? styles.notif_opened : null,
        styles["notif_state_" + state],
        extraClass,
    ];

    const finalClassName = config.filter(Boolean).join(" ");

    return (
        <div
            className={finalClassName}
            onClick={(e) => handleBackgroundClick(e)}
        >
            <div className={styles.container}>
                <div className={styles.body}>
                    <div className={styles.caption}>
                        <span className={styles.icon}>{AdminIcons[state]}</span>
                        <h3 className={styles.title}>{title}</h3>
                    </div>
                    <div className={styles.text}>{text}</div>
                </div>
                <div className={styles.controls}>{buttons}</div>
            </div>
        </div>
    );
}

export default Notif;
