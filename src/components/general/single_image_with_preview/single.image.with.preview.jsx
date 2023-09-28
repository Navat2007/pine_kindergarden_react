import React from 'react';

import ImagePreview from "../image.preview/image.preview.component";

import noImage from "../../../images/no_image.png";

const SingleImageWithPreview = ({image, inner = false, extraClass = ""}) => {

    const [preview, setPreview] = React.useState(<></>);

    const handleOpenPreview = (slideIndex) => {
        setPreview(
            <ImagePreview
                open={true}
                index={slideIndex}
                items={[{url: image}]}
                onClose={() => setPreview(<></>)}
            />
        );
    };

    if (!inner && (!image || image === ""))
        return <img src={noImage} alt={image} loading='lazy' />;

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