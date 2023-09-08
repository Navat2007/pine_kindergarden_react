import React from "react";
import Lessons from "../../components/public/lessons/lessons";
import Feedback from "../../components/public/feedback/feedback";
import {Helmet} from "react-helmet";

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
