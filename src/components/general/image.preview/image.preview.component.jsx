import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import Button from "../../admin/button/button.component";
import { AdminIcons } from "../../svgs";
import "./image.preview.scss";

const ImagePreview = ({ items, open = false, index = 0, onClose }) => {
    const ref = React.createRef();

    React.useEffect(() => {
        if (ref.current) {
            ref.current.go(index);
        }
    }, []);

    return (
        <div className={`image-preview${open ? ` image-preview_open` : ``}`}>
            <Button
                type='button'
                theme={"text"}
                iconName={AdminIcons.close}
                isIconBtn={"true"}
                extraClass={"image-preview__close"}
                aria-label='Закрыть'
                onClick={onClose}
            />
            <Splide
                ref={ref}
                className='image-preview__container'
                options={{
                    arrows: items.length > 1,
                    rewind: true,
                    perPage: 1,
                    pagination: true,
                    speed: 0,
                }}
            >
                {items.map((item, index) => (
                    <SplideSlide key={index}>
                        <img
                            className='image-preview__image'
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
