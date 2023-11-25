import React from 'react';
import {Helmet} from "react-helmet";

import BasicPage from "../../../components/public/basic.page/basic.page.component";

const SupportPage = () => {
    return (
        <BasicPage>
            <Helmet>
                <title>Задать вопрос</title>
            </Helmet>
        </BasicPage>
    );
};

export default SupportPage;