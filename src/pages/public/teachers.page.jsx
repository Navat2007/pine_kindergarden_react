import React from "react";
import { Helmet } from "react-helmet";

import Feedback from "../../components/public/feedback/feedback";
import Teachers from "../../components/public/teachers/teachers";
import PageTransition from "../../components/public/animation/page.transition";

const TeachersPage = () => {
    return (
        <PageTransition>
            <Helmet>
                <title>Педагоги</title>
            </Helmet>
            <Teachers />
            <Feedback />
        </PageTransition>
    );
};

export default TeachersPage;
