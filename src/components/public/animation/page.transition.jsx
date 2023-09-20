import React from "react";
import { motion } from "framer-motion";

// В структуре не применен - в разметку брать только как шаблон для секций.
const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
