import React from "react";
import { motion } from "framer-motion";
import "./construction.scss";

import Image_samo from "../../../images/construction__image.jpg";

const Construction = () => {
    return (
        <motion.section
            className='construction main-wrapper'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
        >
            <img
                className='construction__image'
                src={Image_samo}
                loading='lazy'
                alt='Дети собирают кубики сидя на полу'
            />
            <h1 className='construction__title'>Ведутся работы по созданию страницы...</h1>
        </motion.section>
    );
};

export default Construction;
