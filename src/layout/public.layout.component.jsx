import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/public/header/header";
import Footer from "../components/public/footer/footer";
import "../styles/public.layout.scss";

const PublicLayout = () => {
    React.useLayoutEffect(() => {
        function onEntry(entry) {
            entry.forEach((change) => {
                if (change.isIntersecting) {
                    change.target.classList.add("main-section_showed");
                }
            });
        }

        let options = { rootMargin: "0px 0px 75px 0px", threshold: 0 };
        let observer = new IntersectionObserver(onEntry, options);
        let elements = document.querySelectorAll(".main-section");

        for (let elm of elements) {
            observer.observe(elm);
        }
    }, []);

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
