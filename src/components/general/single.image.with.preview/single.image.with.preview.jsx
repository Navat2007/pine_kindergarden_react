import React from "react";

import ImagePreview from "../image.preview/image.preview.component";

import placeHolderImage from "../../../images/no-image.png";
import placeHolderPhoto from "../../../images/no-photo.jpg";

const SingleImageWithPreview = ({
    image,
    isPersonImage = false,
    noPhoto = isPersonImage ? placeHolderPhoto : placeHolderImage,
    inner = false,
    extraClass = "",
}) => {
    const [preview, setPreview] = React.useState(<></>);

    const handleOpenPreview = (slideIndex) => {
        setPreview(
            <ImagePreview open={true} index={slideIndex} items={[{ url: image }]} onClose={() => setPreview(<></>)} />
        );
    };

    if (!inner && (!image || image === ""))
        return <img className={extraClass} src={noPhoto} alt={image} loading='lazy' />;

    return (
        <>
            <img
                className={extraClass}
                src={inner || image.includes("http") ? image : process.env.REACT_APP_BASE_URL + image}
                alt={image}
                loading='lazy'
                onClick={handleOpenPreview}
            />
            {preview}
        </>
    );
};

export default SingleImageWithPreview;
