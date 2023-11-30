import React from 'react';
import VideoPlayer from "../../public/video.player/video.player.component";
import {isArray} from "lodash";

const VideoGallery = ({items}) => {
    if(isArray(items) && items?.length > 0)
    {
        return (
            <ul className='gallery-form'>
                {items.map((item) => (
                    <li key={window.global.makeid(6)} className='gallery-form__item'>
                        <VideoPlayer source={item.url} />
                    </li>
                ))}
            </ul>
        );
    }
};

export default VideoGallery;