import React from 'react';
import TitleBlock from "../title.block/title.block.component";
import {isBoolean} from "lodash";

const BasicPage = ({children, id,  mainStore, loadings = [], back, loadingTimer = 500}) => {

    const [basicLoading, setBasicLoading] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setBasicLoading(true);
        }, loadingTimer)
    }, []);

    if(mainStore === undefined) {
        return <TitleBlock title={`Oшибка. Не удалось загрузить данные`}/>;
    }

    if(basicLoading === false
        || loadings.filter(item => isBoolean(item.loading) && item.loading).length > 0
        || loadings.filter(item => isBoolean(item.loading?.value) && item.loading?.value).length > 0) {
        return <TitleBlock title={`Загрузка...`}/>;
    }
    else if(id && Object.keys(mainStore.item).length === 0)
    {
        return <TitleBlock title={`Страница не найдена.`} onBack={back}/>;
    }
    else {
        return (
            <>
                {children}
            </>
        );
    }
};

export default BasicPage;