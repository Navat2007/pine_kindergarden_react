import React from "react";
import "./alert-popup.scss";
import { AdminIcons } from "../../svgs.js";

function Notif({ opened, onClose, state = "info", title = "Внимание", text, extraClass, timerInSeconds = 0, buttons }) {
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

    return (
        <div
            class={`alert-popup ${"alert-popup_content_" + state} ${opened ? "alert-popup_opened" : ""} ${
                extraClass ? extraClass : ""
            }`}
            onClick={(e) => handleBackgroundClick(e)}
        >
            <div class='alert-popup__container'>
                <span class='alert-popup__icon'>{AdminIcons[state]}</span>
                <h3 class='alert-popup__title'>{title}</h3>
                <p class='alert-popup__text'>{text}</p>
                <div class='alert-popup__controls'>{buttons}</div>
            </div>
        </div>
    );
}

export default Notif;
