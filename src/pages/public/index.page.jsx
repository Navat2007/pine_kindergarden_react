import React from "react";
import { Helmet } from "react-helmet";

import Lead from "../../components/public/lead/lead";
import Advantages from "../../components/public/advantages/advantages";
import Contact from "../../components/public/contact/contact";
import News from "../../components/public/news/news";
import BasicPage from "../../components/public/basic.page/basic.page.component";

const MainPage = () => {
    return (
        <BasicPage>
            <Helmet>
                <title>Главная</title>
            </Helmet>
            <Lead />
            <Advantages />
            <News />
            <Contact />
        </BasicPage>
    );
};

export default MainPage;
