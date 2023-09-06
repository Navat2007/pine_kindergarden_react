import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import styles from "./banner.module.scss";

const BannerSlider = ({
    items,
    index = 0,
    infiniteLoop = true,
    showArrows = true,
    showStatus = false,
    showThumbs = false,
    autoPlay = false,
    interval = 10000,
    transitionTime = 0,
    swipe = true,
}) => {
    return (
        <>
            <section className={styles.section}>
                <div className={styles.wrap}>
                    <Carousel
                        selectedItem={index}
                        infiniteLoop={infiniteLoop}
                        // showIndicators={false}
                        showArrows={showArrows}
                        showStatus={showStatus}
                        autoPlay={autoPlay}
                        animationHandler={"fade"}
                        interval={interval}
                        transitionTime={transitionTime}
                        stopOnHover
                        swipeable={swipe}
                        emulateTouch={swipe}
                        swipeScrollTolerance={5}
                        showThumbs={showThumbs}
                    >
                        {items.map((item, index) => (
                            <img
                                key={index}
                                className={styles.img}
                                src={item.url}
                                alt={item.url}
                            />
                        ))}
                    </Carousel>
                </div>
            </section>
        </>
    );
};

export default BannerSlider;
