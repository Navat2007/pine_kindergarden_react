import React from "react";

import Menu from "../menu/menu";
import Logo from "../logo/logo";

import "./header.scss";

const Header = () => {
    const stickyHeader = React.useRef();

    React.useLayoutEffect(() => {
        const header = document.querySelector(".header");
        let fixedTop = stickyHeader.current.offsetTop;

        const stickyHeaderEvent = () => {
            if (window.pageYOffset > fixedTop) {
                header.classList.add("header_sticky");
            } else {
                header.classList.remove("header_sticky");
            }
        };
        window.addEventListener("scroll", stickyHeaderEvent);
    }, []);

    // Липкий хедер
    // let scrollPos = window.scrollY;
    // const header = document.querySelector(".header");
    // const scrollChange = 1;
    // const addClassOnScroll = () => header.classList.add("header_sticky");
    // const removeClassOnScroll = () => header.classList.remove("header_sticky");
    //
    // window.addEventListener("scroll", function () {
    //     scrollPos = window.scrollY;
    //
    //     if (scrollPos >= scrollChange) {
    //         addClassOnScroll();
    //     } else {
    //         removeClassOnScroll();
    //     }
    // });

    return (
        <header ref={stickyHeader} className='header main-section section_type_fixed'>
            <div className='header__inner'>
                <Logo place={"header"} />
                <Menu place={"header"} />
            </div>
        </header>
    );
};

export default Header;
