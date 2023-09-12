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
            className={`alert-popup ${"alert-popup_content_" + state} ${opened ? "alert-popup_opened" : ""} ${
                extraClass ? extraClass : ""
            }`}
            onClick={(e) => handleBackgroundClick(e)}
        >
            <div className='alert-popup__container'>
                <span className='alert-popup__icon'>{AdminIcons[state]}</span>
                <h3 className='alert-popup__title'>{title}</h3>
                <p className='alert-popup__text'>{text}</p>
                <div className='alert-popup__controls'>{buttons}</div>
            </div>
        </div>
    );
}

export default Notif;
