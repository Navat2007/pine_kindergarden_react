import React from "react";
import {Helmet} from "react-helmet";

import Feedback from "../../components/public/feedback/feedback";
import Construction from "../../components/public/cunstruction/construction";
import PageTransition from "../../components/public/animation/page.transition";

const ModePage = () => {
    return (
        <PageTransition>
            <Helmet>
                <title>Режим</title>
            </Helmet>
            <Construction/>
            <Feedback />
        </PageTransition>
    );
};

export default ModePage;
