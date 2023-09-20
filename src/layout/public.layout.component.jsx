import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

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
            <Header />
            <motion.main
                className='main-content'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
            >
                <Outlet />
            </motion.main>
            <Footer />
        </>
    );
};

export default PublicLayout;
