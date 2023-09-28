import React from "react";

import "./preloader.scss";

const Preloader = ({ children, loading}) => {
    if(loading) {
        return (
            <div className={"preloader"}>
                <div className={"preloader__item"}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }

    return (
        <>
            {children}
        </>
    );
};

export default Preloader;
