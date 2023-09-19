import React from "react";
import {Helmet} from "react-helmet";

import Food from "../../components/public/food/food";
import Feedback from "../../components/public/feedback/feedback";
import PageTransition from "../../components/public/animation/page.transition";

const FoodPage = () => {
    return (
        <PageTransition>
            <Helmet>
                <title>Питание</title>
            </Helmet>
            <Food />
            <Feedback />
        </PageTransition>
    );
};

export default FoodPage;
