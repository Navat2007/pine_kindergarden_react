import React from 'react';
import {PreloaderContext} from "../../../context";

const BasicPage = ({children, loadings = [], loadingTimer = 500}) => {

    const [basicLoading, setBasicLoading] = React.useState(false);
    const {loading, setLoading} = React.useContext(PreloaderContext);

    React.useLayoutEffect(() => {
        setTimeout(() => {
            setBasicLoading(true);
        }, loadingTimer)
    }, [loadingTimer]);

    React.useLayoutEffect(() => {
        if(basicLoading && loadings.filter(item => item.loading).length === 0){
            setLoading(false);
        }
    }, [basicLoading, loadings, setLoading]);

    if(basicLoading === false || loadings.filter(item => item.loading).length > 0) {
        //console.log("basic page loading");
        return null;
    }
    else if(loadings.length > 0
        && loadings.filter(item => item.loading).length === 0
        && loadings.filter(item => Object.keys(item.item).length > 0 || Object.keys(item.items).length > 0).length === 0){
        //console.log("basic page loading failed");
        return (
            <section className='article'>
                <h2 className='main-title'>Не удалось загрузить данные...</h2>
            </section>
        );
    }
    else if(loading === false){
        //console.log("basic page loaded");
        return (
            <>
                {children}
            </>
        );
    }
};

export default BasicPage;