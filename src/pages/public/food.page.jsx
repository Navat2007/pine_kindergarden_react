import React from "react";
import {Helmet} from "react-helmet";

import Food from "../../components/public/food/food";
import Feedback from "../../components/public/feedback/feedback";

const FoodPage = () => {
    return (
        <>
            <Helmet>
                <title>Питание</title>
            </Helmet>
            <Food />
            <Feedback />
        </>
    );
};

export default FoodPage;
