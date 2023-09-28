import React from "react";
import { Helmet } from "react-helmet";

import useNewsStore from "../../store/public/newsStore";

import Lead from "../../components/public/lead/lead";
import Advantages from "../../components/public/advantages/advantages";
import Contact from "../../components/public/contact/contact";
import News from "../../components/public/news/news";
import BasicPage from "../../components/public/basic.page/basic.page.component";

const IndexPage = () => {
    const store = useNewsStore();

    const fetchData = async () => {
        await store.loadAllMain();
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <BasicPage>
            <Helmet>
                <title>Центр развития ребенка — детский сад «Сосны»</title>
            </Helmet>
            <Lead />
            <Advantages />
            <News items={store.itemsMain} />
            <Contact />
        </BasicPage>
    );
};

export default IndexPage;
