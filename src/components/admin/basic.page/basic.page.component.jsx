import React from 'react';
import TitleBlock from "../title.block/title.block.component";

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

    if(basicLoading === false || loadings.filter(item => item.loading).length > 0) {
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