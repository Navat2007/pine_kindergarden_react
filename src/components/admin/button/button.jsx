import React from "react";

import "./button.scss";

const Button = ({ children, iconName, type = "submit", iconBtn, extraClass = "", spinnerActive = false, ...rest }) => {
    return (
        <button
            className={`button ${extraClass} ${iconBtn && "button_type_only-icon"} ${
                spinnerActive && "button_loading"
            }`}
            type={type}
            {...rest}
        >
            {iconName && <span className='button__icon'>{iconName}</span>}
            {children}
            {spinnerActive && (
                <div className={"button__spinner"}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )}
        </button>
    );
};

export default Button;
