import React from 'react';

import ImagePreview from "../image_preview/image.preview.component";

import noImage from "../../../images/no_image.png";
import styles from "../page_components/theatre/theatre.module.scss";

const SingleImageWithPreview = ({image}) => {

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

    if (!image || image === "")
        return <img src={noImage} alt={image} />;

    return (
        <>
            <img
                className={styles.logo}
                src={image.includes("http") ? image : process.env.REACT_APP_BASE_URL + image}
                alt={image}
                onClick={handleOpenPreview}
            />
            {preview}
        </>
    );
};

export default SingleImageWithPreview;