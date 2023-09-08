import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/public/header/header";
import Footer from "../components/public/footer/footer";
import "../styles/public.layout.scss";
import TrackVisibility from "react-on-screen";

const PublicLayout = () => {
    return (
        <>
            <Header />
            <main className='main-content'>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default PublicLayout;
