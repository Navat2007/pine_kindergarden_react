import React from "react";
import { Helmet } from "react-helmet";

import BasicPage from "../../../components/public/basic.page/basic.page.component";
import Construction from "../../../components/public/cunstruction/construction";

const ModePage = () => {
    return (
        <BasicPage>
            <Helmet>
                <title>Режим</title>
            </Helmet>
             <Construction />
        </BasicPage>
    );
};

export default ModePage;
