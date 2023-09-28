import React from "react";
import "./to.top.button.scss";

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

    return <>{showButton && <button onClick={scrollToTop} className='to-top-button'></button>}</>;
};

export default ToTopButton;
