import React from "react";
import "./button.scss";

const Button = ({ type = "submit", text }) => {
    return (
        <button className='button' type={type}>
            {text}
        </button>
    );
};

export default Button;
