import React from "react";
import {Helmet} from "react-helmet";
import {motion} from "framer-motion";

import Documents from "../../components/public/documents/documents";
import Feedback from "../../components/public/feedback/feedback";

const DocumentsPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
        >
            <Helmet>
                <title>Документы</title>
            </Helmet>
            <Documents />
            <Feedback />
        </motion.div>
    );
};

export default DocumentsPage;
