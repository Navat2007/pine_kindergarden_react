import React from "react";
import {Helmet} from "react-helmet";
import {motion} from "framer-motion";

import Food from "../../components/public/food/food";
import Feedback from "../../components/public/feedback/feedback";

const FoodPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
        >
            <Helmet>
                <title>Питание</title>
            </Helmet>
            <Food />
            <Feedback />
        </motion.div>
    );
};

export default FoodPage;
