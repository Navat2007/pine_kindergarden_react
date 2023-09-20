import React from "react";
import { Helmet } from "react-helmet";

import About from "../../components/public/about/about";
import Feedback from "../../components/public/feedback/feedback";

const AboutPage = () => {
    return (
        <>
            <Helmet>
                <title>О нас</title>
            </Helmet>
            <About />
            <Feedback />
        </>
    );
};

export default AboutPage;
