import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import createDOMPurify from "dompurify";
import { motion } from "framer-motion";
import moment from "moment";

import useSpectaclesStore from "../../store/public/spectaclesStore";
import useNewsStore from "../../store/public/newsStore";

import BannerSlider from "../../components/slider/banner.slider.component";
import Button from "../../components/button/button.component";

import commonStyles from "./common.module.scss";
import noPhoto from "../../images/no_photo_spectacle.png";

const MainPage = () => {
    const DOMPurify = createDOMPurify(window);
    const navigate = useNavigate();

    const spectaclesStore = useSpectaclesStore();
    const newsStore = useNewsStore();

    React.useEffect(() => {
        const fetchData = async () => {

        };

        fetchData();
    }, []);

    function truncateString(str, num) {
        if (!str) return "";

        // If the length of str is less than or equal to num
        // just return str--don't truncate it.
        if (str && str.length <= num) {
            return str;
        }
        // Return str truncated with '...' concatenated to the end of str.
        return str.slice(0, num) + "...";
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
        >
            Index
        </motion.div>
    );
};

export default MainPage;
