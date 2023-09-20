import React from "react";
import { motion } from "framer-motion";

import "./food.scss";
import Food__image from "../../../images/food__image.jpg";

const Food = () => {
    return (
        <motion.section
            className='food'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
        >
            <img
                className='food__image'
                src={Food__image}
                loading='lazy'
                alt='Изображение супа со слоненком из хлеба, обед в детском садике'
            />
            <h1 className='food__title'>Питание</h1>
            <div className='food__text'>
                <p>
                    Наш детский сад имеет собственную кухню, где работают высокопрофессиональные повара, которые
                    стараются для наших детей, чтобы их питание было полезным и вкусным. Пищевой блок строго
                    контролируется в соответствии с требованиями СанПин.
                </p>
            </div>
            <h2 className='food__title'>Меню</h2>
            <p className='food__subtitle'>
                24.04.2023 <br />
                25.04.2023 <br />
                26.04.2023
            </p>
            <div className='food__text'>
                <p>Питание детей в нашем дошкольном учреждении организуется на следующей законодательной основе:</p>
                <ol>
                    <li>
                        <a
                            href='https://sh-celinnaya-oosh-r56.gosweb.gosuslugi.ru/netcat_files/32/315/sanpin_2.3.2.4.3590_20.pdf'
                            target='_blank'
                            rel='nofollow noopener'
                            className='main-link'
                        >
                            СанПиН 2.3/2.4.3590-20 «Санитарно-эпидемиологические требования к организации общественного
                            питания населения»{" "}
                        </a>
                        , которые вступили в действие с 1 января 2021 года и будут действительны до 1 января 2027 года.
                    </li>
                    <li>
                        <a
                            href='https://shkolabessonovskaya-r31.gosweb.gosuslugi.ru/netcat_files/userfiles/Pitanie/Prikaz-Minobrnauki-RF-178.pdf'
                            target='_blank'
                            rel='nofollow noopener'
                            className='main-link'
                        >
                            Приказ Министерства здравоохранения и социального развития РФ и Министерства образования
                            и науки РФ от 11 марта 2012 г. № 213н/178 «Об утверждении методических рекомендаций
                            по организации питания обучающихся и воспитанников образовательных учреждений».
                        </a>
                    </li>
                </ol>
                <br />
                <p>
                    СанПиН 2.3/2.4.3590-20 устанавливает ряд определенных требований, выдвигаемых к построению процесса
                    организации питания в дошкольных учреждениях:
                </p>
                <ul>
                    <li>
                        к пищевой продукции, которая не допускается при организации питания детей, использование которой
                        запрещается;
                    </li>
                    <li>к среднесуточным наборам пищевой продукции (минимальных) для детей до 7-ми лет;</li>
                    <li>к массе порций для детей в зависимости от возраста;</li>
                    <li>
                        к перечню витаминов и минеральных веществ (суточного) и указывает н, а потребность в пищевых
                        веществах, энергии;
                    </li>
                    <li>
                        к распределению в процентном отношении потребления пищевых веществ и энергии по приемам пищи
                        в зависимости от времени пребывания в организации;
                    </li>
                    <li>к режиму питания в зависимости от длительности пребывания детей в дошкольной организации;</li>
                    <li>к замене пищевой продукции с учетом их пищевой ценности;</li>
                    <li>
                        к количеству приемов пищи в зависимости от режима функционирования организации и режима обучения
                        и др.
                    </li>
                </ul>
            </div>
        </motion.section>
    );
};

export default Food;
