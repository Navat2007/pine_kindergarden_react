import React from "react";
import {Helmet} from "react-helmet";
import {motion} from "framer-motion";

import Feedback from "../../components/public/feedback/feedback";
import Construction from "../../components/public/cunstruction/construction";

const ModePage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
        >
            <Helmet>
                <title>Режим</title>
            </Helmet>
            <Construction/>
            <Feedback />
        </motion.div>
    );
};

export default ModePage;
