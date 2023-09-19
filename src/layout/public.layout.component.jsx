import React from "react";
import {Outlet, useLocation} from "react-router-dom";

import Header from "../components/public/header/header";
import Footer from "../components/public/footer/footer";

import "../styles/public.layout.scss";

const PublicLayout = () => {
    const location = useLocation();

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
            <Header/>
            <main className='main-content'>
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
};

export default PublicLayout;
