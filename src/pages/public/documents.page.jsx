import React from "react";
import {Helmet} from "react-helmet";

import Documents from "../../components/public/documents/documents";
import Feedback from "../../components/public/feedback/feedback";
import PageTransition from "../../components/public/animation/page.transition";

const DocumentsPage = () => {
    return (
        <PageTransition>
            <Helmet>
                <title>Документы</title>
            </Helmet>
            <Documents />
            <Feedback />
        </PageTransition>
    );
};

export default DocumentsPage;
