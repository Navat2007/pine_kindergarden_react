import React from "react";
import { motion } from "framer-motion";
import { YMaps, Map, Placemark } from "react-yandex-maps";

import "./contact.scss";

const Contact = () => {
    return (
        <motion.section
            className='contact'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
        >
            <div className='contact__map' id='contact_map'>
                <YMaps>
                    <Map
                        state={{
                            center: [55.733327, 37.055938],
                            zoom: 16,
                        }}
                        width='100%'
                        height='100%'
                    >
                        <Placemark
                            geometry={[55.733327, 37.055938]}
                            properties={{
                                iconContent: "Детский сад СОСНЫ",
                            }}
                            options={{ preset: "islands#redStretchyIcon" }}
                        />
                    </Map>
                </YMaps>
            </div>
            <div className='contact__detail'>
                <h2 className='contact__title'>Контакты</h2>
                <address className='contact__address'>
                    Адрес: город&nbsp;Одинцово, поселок&nbsp;Сосны
                    <br />
                    Телефон:{" "}
                    <a
                        className='contact__link'
                        target={"_blank"}
                        href='tel:84956302426'
                        rel='noopener nofollow noreferer'
                    >
                        +7&nbsp;(495)&nbsp;630-24-26
                    </a>
                    <br />
                    E-mail:&nbsp;
                    <a
                        className='contact__link'
                        target={"_blank"}
                        href='mailto:crrds7777@gmail.com'
                        rel='noopener nofollow noreferer'
                    >
                        crrds7777@gmail.com
                    </a>
                </address>
            </div>
        </motion.section>
    );
};

export default Contact;
