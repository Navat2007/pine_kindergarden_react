import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import styles from "./image.preview.module.scss";

const ImagePreview = ({
    children,
    items,
    open = false,
    index = 0,
    onClose,
}) => {
    const config = [styles.container, open ? styles.container_opened : null];

    const finalClassName = config.filter(Boolean).join(" ");

    const ref = React.createRef();

    React.useEffect(() => {

        if(ref.current)
        {
            ref.current.go(index);
        }

    }, []);

    return (
        <div className={finalClassName}>
            <span
                className={`${styles.close} mdi mdi-close`}
                aria-label="Закрыть"
                title="Закрыть"
                onClick={onClose}
            />
            <Splide
                ref={ref}
                className={styles.wrap}
                options={{
                    arrows: items.length > 1,
                    rewind: true,
                    perPage: 1,
                    pagination: true,
                    speed: 0
                }}
            >
                {items.map((item, index) => (
                    <SplideSlide key={index}>
                        <img
                            className={styles.image}
                            src={item.url.includes("http") ? item.url : process.env.REACT_APP_BASE_URL + item.url}
                            alt={item.url}
                        />
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );
};

export default ImagePreview;
