import React from "react";
import ReactPlayer from "react-player";
import { AdminIcons, SocialIcons } from "../../svgs";
import "./video.player.scss";

const VideoPlayer = ({ source, style, extraClass }) => {
    React.useEffect(() => {
        //console.log(source);
    }, []);

    const getVideoIcon = (link) => {
        if (link.includes("t.me/")) return SocialIcons.t;
        else if (link.includes("vk.com/")) return SocialIcons.vk;
        else if (link.includes("ok.ru/")) return SocialIcons.ok;
        else if (link.includes("my.mail.ru/")) return SocialIcons.my_mail;
        else if (link.includes("facebook.com/") || link.includes("fb.com/")) return SocialIcons.facebook;
        else if (link.includes("google.com/")) return SocialIcons.google;
        else if (link.includes("linkedin.")) return SocialIcons.linkedin;
        else if (link.includes("twitter.com/")) return SocialIcons.twitter;
        else if (link.includes("instagram.com/")) return SocialIcons.instagram;
        else if (link.includes("yandex.ru/")) return SocialIcons.yandex;
        else if (link.includes("rutube.ru/")) return SocialIcons.rutube;
        else if (link.includes("youtube.com/") || link.includes("youtu.be/")) return SocialIcons.youtube;
        else return AdminIcons.error;
    };

    if (source.includes("iframe") === false) {
        if (source.includes("youtube") || source.includes("youtu.be"))
            return (
                <ReactPlayer
                    className={`custom-iframe ${extraClass}`}
                    width='100%'
                    height='100%'
                    style={style}
                    url={source}
                    playing={false}
                    controls={true}
                />
            );

        if (
            (source.includes("vk.com") && source.includes("video_ext.php")) ||
            (source.includes("rutube.ru") && source.includes("play/embed"))
        ) {
            return (
                <iframe
                    className={`custom-iframe ${extraClass}`}
                    src={source}
                    width='100%'
                    height='100%'
                    allow='autoplay; encrypted-media; fullscreen; picture-in-picture;'
                />
            );
        }

        return (
            <a className={`custom-iframe custom-iframe_holder_link ${extraClass}`} target={"_blank"} href={source}>
                <span className='custom-iframe__icon'>{getVideoIcon(source)}</span>
                <span className='custom-iframe__name'>{source}</span>
            </a>
        );
    } else {
        return (
            <p className={`custom-iframe custom-iframe_holder_pharagraph ${extraClass}`}>
                <span className='custom-iframe__icon'>{getVideoIcon(source)}</span>
                <span className='custom-iframe__name'>Видео не доступно</span>
            </p>
        );
    }
};

export default VideoPlayer;
