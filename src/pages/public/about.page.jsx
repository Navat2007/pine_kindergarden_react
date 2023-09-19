import React from "react";
import {Helmet} from "react-helmet";

import About from "../../components/public/about/about";
import Feedback from "../../components/public/feedback/feedback";
import PageTransition from "../../components/public/animation/page.transition";

const AboutPage = () => {
    return (
        <PageTransition>
            <Helmet>
                <title>О нас</title>
            </Helmet>
            <About />
            <Feedback />
        </PageTransition>
    );
};

export default AboutPage;
