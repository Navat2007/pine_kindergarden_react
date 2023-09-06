import React from "react";
import ReactPlayer from "react-player";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const VideoSlider = ({ items = [], thumbs }) => {
    const mainRef = React.createRef();
    const thumbsRef = React.createRef();
    const videoRefs = React.useRef([]);

    function youtube_parser(url) {
        let regExp =
            /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        let match = url.match(regExp);
        return match && match[7].length == 11 ? match[7] : false;
    }

    const getVideoThumb = (videoId) =>
        `https://img.youtube.com/vi/${videoId}/default.jpg`;

    React.useEffect(() => {
        if (thumbs && items.length > 1)
            mainRef.current.sync(thumbsRef.current.splide);
    }, []);

    if (items.length === 0) return null;

    return (
        <>
            <Splide
                options={{
                    type: "loop",
                    arrows: true,
                    perPage: 1,
                    perMove: 1,
                    gap: "1rem",
                    pagination: false,
                }}
                ref={mainRef}
            >
                {items.map((item, index) => (
                    <SplideSlide key={index}>
                        <ReactPlayer
                            ref={(el) => (videoRefs.current[index] = el)}
                            width="100%"
                            height={"auto"}
                            className="video__react-player"
                            url={item.url}
                            playing={false}
                            controls={true}
                        />
                    </SplideSlide>
                ))}
            </Splide>
            {thumbs && items.length > 1 && (
                <>
                    <br />
                    <Splide
                        options={{
                            type: "slide",
                            rewind: true,
                            gap: "1rem",
                            pagination: false,
                            fixedWidth: 110,
                            fixedHeight: 70,
                            cover: true,
                            focus: "center",
                            isNavigation: true,
                            arrows: false,
                        }}
                        ref={thumbsRef}
                        aria-label=""
                    >
                        {items.map((item, index) => (
                            <SplideSlide key={index}>
                                <img
                                    src={getVideoThumb(
                                        youtube_parser(item.url)
                                    )}
                                    alt={"Видео"}
                                />
                            </SplideSlide>
                        ))}
                    </Splide>
                </>
            )}
        </>
    );
};

export default VideoSlider;
