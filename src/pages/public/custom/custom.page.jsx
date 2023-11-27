import React from 'react';
import {Helmet} from "react-helmet";
import Construction from "../../../components/public/cunstruction/construction";
import BasicPage from "../../../components/public/basic.page/basic.page.component";

const CustomPage = ({id}) => {
    return (
        <BasicPage>
            <Helmet>
                <title>Режим</title>
            </Helmet>
            <Construction />
        </BasicPage>
    );
};

export default CustomPage;