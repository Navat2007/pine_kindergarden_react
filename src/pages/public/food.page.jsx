import React from "react";
import Food from "../../components/public/food/food";
import Feedback from "../../components/public/feedback/feedback";
import {Helmet} from "react-helmet";

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
