import React from "react";
import { motion } from "framer-motion";

import "./lead.scss";
import Image from "../../../images/lead__image.jpg";

const Lead = () => {
    return (
        <motion.section
            className='lead'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
        >
            <h1 className='main-title'>
                ФГБДОУ &laquo;Центр развития ребенка&nbsp;&mdash; детский сад &laquo;Сосны&raquo;
            </h1>
            <img className='lead__image' src={Image} loading='lazy' alt='Изображение соснового леса' />
        </motion.section>
    );
};

export default Lead;
