import React from "react";

import "./button.scss";

const Button = ({
    children,
    iconName,
    type = "submit",
    isIconBtn,
    theme,
    extraClass,
    spinnerActive = false,
    ...rest
}) => {
    return (
        <button
            className={`button${theme ? ` button_theme_${theme}` : ``}${extraClass ? ` ${extraClass}` : ``}${
                isIconBtn ? ` button_type_only-icon` : ``
            }${spinnerActive ? ` button_loading` : ``}`}
            disabled={spinnerActive}
            type={type}
            {...rest}
        >
            {iconName && <span className={`button__icon${extraClass ? ` ${extraClass}-icon` : ``}`}>{iconName}</span>}
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
