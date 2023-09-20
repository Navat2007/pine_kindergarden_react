import React from "react";
import { Helmet } from "react-helmet";

import Lessons from "../../components/public/lessons/lessons";
import Feedback from "../../components/public/feedback/feedback";

const LessonsPage = () => {
    return (
        <>
            <Helmet>
                <title>Занятия</title>
            </Helmet>
            <Lessons />
            <Feedback />
        </>
    );
};

export default LessonsPage;
