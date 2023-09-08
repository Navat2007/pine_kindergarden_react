import React from "react";

import "./button.scss";

const Button = ({ type = "submit", text, spinnerActive = false, ...rest }) => {
    return (
        <button
            className={`button ${spinnerActive && "button_loading"}`}
            type={type}
            {...rest}
        >
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
