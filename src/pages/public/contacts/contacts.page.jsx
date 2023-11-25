import React from 'react';
import {Helmet} from "react-helmet";

import BasicPage from "../../../components/public/basic.page/basic.page.component";
import Contact from "../../../components/public/contact/contact";

const ContactsPage = () => {
    return (
        <BasicPage>
            <Helmet>
                <title>Контакты</title>
            </Helmet>
            <Contact/>
        </BasicPage>
    );
};

export default ContactsPage;