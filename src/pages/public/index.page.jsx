import React from "react";
import {Helmet} from "react-helmet";
import {motion} from "framer-motion";

import Lead from "../../components/public/lead/lead";
import Advantages from "../../components/public/advantages/advantages";
import Contact from "../../components/public/contact/contact";
import Feedback from "../../components/public/feedback/feedback";

const MainPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
        >
            <Helmet>
                <title>Главная</title>
            </Helmet>
            <Lead />
            <Advantages />
            <Contact />
            <Feedback />
        </motion.div>
    );
};

export default MainPage;
