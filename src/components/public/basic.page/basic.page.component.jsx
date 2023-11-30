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
        return null;
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