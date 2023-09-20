import React from "react";
import { Helmet } from "react-helmet";

import Documents from "../../components/public/documents/documents";
import Feedback from "../../components/public/feedback/feedback";

const DocumentsPage = () => {
    return (
        <>
            <Helmet>
                <title>Документы</title>
            </Helmet>
            <Documents />
            <Feedback />
        </>
    );
};

export default DocumentsPage;
