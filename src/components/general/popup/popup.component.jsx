import React from "react";
import { AdminIcons } from "../../svgs.js";
import "./popup.scss";

const Popup = ({ opened = false, title, extraClass, children, buttons, onClose }) => {
    const handleBackgroundClick = (event) => {
        if (event.target === event.currentTarget && onClose) {
            onClose();
        }
    };

    return (
        <div
            className={`popup ${opened ? "popup_opened" : ""} ${extraClass ? extraClass : ""}`}
            onClick={(e) => handleBackgroundClick(e)}
        >
            <div className={"popup__container"}>
                <h2 className={"popup__title"}>{title}</h2>
                <button type='button' className={"popup__close"} aria-label='Закрыть окно' onClick={onClose}>
                    {AdminIcons.close}
                </button>
                <div className={"popup__body"}>{children}</div>
                {buttons && <div className={"popup__controls"}>{buttons}</div>}
            </div>
        </div>
    );
};

export default Popup;
