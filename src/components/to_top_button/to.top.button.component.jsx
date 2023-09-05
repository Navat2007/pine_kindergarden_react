import React from "react";

import styles from "./to.top.button.module.scss";
import { AdminIcons } from "../svgs.js";

const ToTopButton = () => {
    const [showButton, setShowButton] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 500) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            {showButton && (
                <button
                    onClick={scrollToTop}
                    className={styles.backToTop}
                >
                    {AdminIcons.chevron_down}
                </button>
            )}
        </>
    );
};

export default ToTopButton;
