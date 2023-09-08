import React from "react";

import "./button.scss";

const Button = ({ type = "submit", extraClass = "", text, icon, spinnerActive = false, ...rest }) => {
    return (
        <button className={`button ${extraClass} ${spinnerActive && "button_loading"}`} type={type} {...rest}>
            {icon}
            {text}
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
