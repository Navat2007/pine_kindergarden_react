import React from "react";
import { motion } from 'framer-motion';

import "./button.scss";

const Button = ({type = "submit", text, spinnerActive = false, ...rest}) => {
    return (
        <motion.button
            className='button'
            whileTap={{scale: 0.97}}
            transition={{type: "spring", stiffness: 400, damping: 20}}
            type={type}
            {...rest}
        >
            {text}
            {
                spinnerActive
                &&
                <div className={"button__spinner"}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
        </motion.button>
    );
};

export default Button;
