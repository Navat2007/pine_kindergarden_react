import React from "react";
import {Helmet} from "react-helmet";

import Lead from "../../components/public/lead/lead";
import Advantages from "../../components/public/advantages/advantages";
import Contact from "../../components/public/contact/contact";
import Feedback from "../../components/public/feedback/feedback";
import PageTransition from "../../components/public/animation/page.transition";

const MainPage = () => {
    return (
        <PageTransition>
            <Helmet>
                <title>Главная</title>
            </Helmet>
            <Lead />
            <Advantages />
            <Contact />
            <Feedback />
        </PageTransition>
    );
};

export default MainPage;
