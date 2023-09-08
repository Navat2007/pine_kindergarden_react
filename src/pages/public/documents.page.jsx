import React from "react";
import Documents from "../../components/public/documents/documents";
import Feedback from "../../components/public/feedback/feedback";
import {Helmet} from "react-helmet";

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
