import React from "react";
import Lead from "../../components/public/lead/lead";
import Advantages from "../../components/public/advantages/advantages";
import Contact from "../../components/public/contact/contact";
import Feedback from "../../components/public/feedback/feedback";
import {Helmet} from "react-helmet";

const MainPage = () => {
    return (
        <>
            <Helmet>
                <title>Главная</title>
            </Helmet>
            <Lead />
            <Advantages />
            <Contact />
            <Feedback />
        </>
    );
};

export default MainPage;
