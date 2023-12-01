import React from "react";
import VideoPlayer from "../../public/video.player/video.player.component";
import { isArray } from "lodash";
import "./video.gallery.scss";
const VideoGallery = ({ items }) => {
    if (isArray(items) && items?.length > 0) {
        return (
            <ul className='video-gallery'>
                {items.map((item) => (
                    <li key={window.global.makeid(6)} className='video-gallery__item'>
                        <VideoPlayer source={item.url} />
                    </li>
                ))}
            </ul>
        );
    }
};

export default VideoGallery;
