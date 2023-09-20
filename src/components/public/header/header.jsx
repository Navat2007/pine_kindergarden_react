import React from "react";

import Menu from "../menu/menu";
import Logo from "../logo/logo";
import { motion } from "framer-motion";

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

    return (
        <motion.header
            ref={stickyHeader}
            className='header'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
        >
            <div className='header__inner'>
                <Logo place={"header"} />
                <Menu place={"header"} />
            </div>
        </motion.header>
    );
};

export default Header;
