import React from "react";
import {Helmet} from "react-helmet";
import {motion} from "framer-motion";

import Lessons from "../../components/public/lessons/lessons";
import Feedback from "../../components/public/feedback/feedback";

const LessonsPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
        >
            <Helmet>
                <title>Занятия</title>
            </Helmet>
            <Lessons />
            <Feedback />
        </motion.div>
    );
};

export default LessonsPage;
