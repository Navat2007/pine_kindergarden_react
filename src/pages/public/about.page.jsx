import React from "react";
import About from "../../components/public/about/about";
import Feedback from "../../components/public/feedback/feedback";
import {Helmet} from "react-helmet";

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
