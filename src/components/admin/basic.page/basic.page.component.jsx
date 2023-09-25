import React from 'react';
import TitleBlock from "../title.block/title.block.component";

const BasicPage = ({children, id,  mainStore, loadings = [], back}) => {

    if(mainStore === undefined) {
        return <TitleBlock title={`Oшибка. Не удалось загрузить данные`}/>;
    }

    const Loading = () => {
        if (loadings.filter(item => item.loading).length > 0) {
            return <TitleBlock title={`Загрузка...`}/>;
        }
    };

    const NotFound = () => {
        if (id && loadings.filter(item => item.loading).length === 0 && Object.keys(mainStore.item).length === 0) {
            return <TitleBlock title={`Страница не найдена.`} onBack={back}/>;
        }
    };

    return (
        <>
            <Loading />
            <NotFound />
            {children}
        </>
    );
};

export default BasicPage;