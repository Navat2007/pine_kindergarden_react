import React from "react";
import Feedback from "../../components/public/feedback/feedback";
import Construction from "../../components/public/cunstruction/construction";
import {Helmet} from "react-helmet";

const ModePage = () => {
    return (
        <>
            <Helmet>
                <title>Режим</title>
            </Helmet>
            <Construction/>
            <Feedback />
        </>
    );
};

export default ModePage;
