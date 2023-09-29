import React from "react";

import styles from "./video.player.module.scss";
import { SocialIcons } from "../../svgs";
import ReactPlayer from "react-player";

const VideoPlayer = ({ source, style, customClassName }) => {
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
        else return null;
    };

    if (source.includes("youtube") || source.includes("youtu.be"))
        return (
            <ReactPlayer
                className={styles.frameBox}
                width='100%'
                height='100%'
                style={style}
                url={source}
                playing={false}
                controls={true}
            />
        );

    if (
        source.includes("youtu.be") ||
        (source.includes("vk.com") && source.includes("video_ext.php")) ||
        (source.includes("rutube.ru") && source.includes("play/embed"))
    ) {
        return (
            <iframe
                className={styles.frameBox}
                src={source}
                width='100%'
                height='100%'
                allow='autoplay; encrypted-media; fullscreen; picture-in-picture;'
                webkitAllowFullScreen
                mozallowfullscreen
            ></iframe>
        );
    }

    return (
        <a className={styles.item} target={"_blank"} href={source}>
            <span className={styles.icon}>{getVideoIcon(source)}</span>
            <span className={styles.name}>{source}</span>
        </a>
    );
};

export default VideoPlayer;
