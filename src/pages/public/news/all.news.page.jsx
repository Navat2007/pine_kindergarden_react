import React from 'react';

import useNewsStore from "../../../store/public/newsStore";

import News from "../../../components/public/news/news";
import BasicPage from "../../../components/public/basic.page/basic.page.component";

const AllNewsPage = () => {
    const store = useNewsStore();

    const fetchData = async () => {
        await store.loadAll();
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <BasicPage loadings={[store]}>
          <News items={store.items} />
        </BasicPage>
    );
};

export default AllNewsPage;