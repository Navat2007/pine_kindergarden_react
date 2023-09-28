import React from 'react';
import {PreloaderContext} from "../../../context";

const BasicPage = ({children, loadings = [], loadingTimer = 500}) => {

    const [basicLoading, setBasicLoading] = React.useState(false);
    const {setLoading} = React.useContext(PreloaderContext);

    React.useEffect(() => {
        setTimeout(() => {
            setBasicLoading(true);
        }, loadingTimer)
    }, [loadingTimer]);

    React.useEffect(() => {
        if(basicLoading && loadings.filter(item => item.loading).length === 0){
            setLoading(false);
        }
    }, [basicLoading, loadings, setLoading]);

    if(basicLoading === false || loadings.filter(item => item.loading).length > 0) {
        return null;
    }
    else if(loadings.length > 0
        && loadings.filter(item => item.loading).length === 0
        && loadings.filter(item => Object.keys(item.item).length > 0 || Object.keys(item.items).length > 0).length === 0){
        return (
            <section className='article'>
                <h2 className='main-title'>Не удалось загрузить данные...</h2>
            </section>
        );
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