import React from "react";
import { Helmet } from "react-helmet";

import Lead from "../../components/public/lead/lead";
import Advantages from "../../components/public/advantages/advantages";
import Contact from "../../components/public/contact/contact";
import News from "../../components/public/news/news";
import Feedback from "../../components/public/feedback/feedback";

const MainPage = () => {
    return (
        <>
            <Helmet>
                <title>Главная</title>
            </Helmet>
            <Lead />
            <Advantages />
            <News />
            <Contact />
            <Feedback />
        </>
    );
};

export default MainPage;
