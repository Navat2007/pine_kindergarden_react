import React from "react";
import {Helmet} from "react-helmet";

import Feedback from "../../components/public/feedback/feedback";
import Construction from "../../components/public/cunstruction/construction";

const TeachersPage = () => {
    return (
        <>
            <Helmet>
                <title>Педагоги</title>
            </Helmet>
            <Construction/>
            <Feedback />
        </>
    );
};

export default TeachersPage;
