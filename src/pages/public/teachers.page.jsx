import React from "react";
import { Helmet } from "react-helmet";

import Feedback from "../../components/public/feedback/feedback";
import Teachers from "../../components/public/teachers/teachers";

const TeachersPage = () => {
    return (
        <>
            <Helmet>
                <title>Педагоги</title>
            </Helmet>
            <Teachers />
            <Feedback />
        </>
    );
};

export default TeachersPage;
