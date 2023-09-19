import React from "react";
import {Helmet} from "react-helmet";

import Lessons from "../../components/public/lessons/lessons";
import Feedback from "../../components/public/feedback/feedback";
import PageTransition from "../../components/public/animation/page.transition";

const LessonsPage = () => {
    return (
        <PageTransition>
            <Helmet>
                <title>Занятия</title>
            </Helmet>
            <Lessons />
            <Feedback />
        </PageTransition>
    );
};

export default LessonsPage;
