import React from 'react';
import { motion, Variants } from "framer-motion";

const ScrollTransition = ({children, ...props}) => {
    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min)
    }

    const cardVariants: Variants = {
        offscreen: {
            y: 300,
            rotate: getRandomNumber(-30, 30),
        },
        onscreen: {
            y: 0,
            rotate: 0,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.8
            }
        }
    };

    return (
        <motion.div
            className="card-container"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.05 }}
            variants={cardVariants}
        >
            {children}
        </motion.div>
    );
};

export default ScrollTransition;