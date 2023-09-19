import React from "react";
import {Helmet} from "react-helmet";
import {motion} from "framer-motion";

import About from "../../components/public/about/about";
import Feedback from "../../components/public/feedback/feedback";

const AboutPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
        >
            <Helmet>
                <title>О нас</title>
            </Helmet>
            <About />
            <Feedback />
        </motion.div>
    );
};

export default AboutPage;
