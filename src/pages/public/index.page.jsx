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
import concordImage from "../../images/concord/concord.jpg";
import noPhoto from "../../images/no_photo_spectacle.png";
// import newImage from "../../images/concord/new_1.jpg";
// import styles from "./news/all.news.module.scss";

const MainPage = () => {
    const DOMPurify = createDOMPurify(window);
    const navigate = useNavigate();

    const spectaclesStore = useSpectaclesStore();
    const newsStore = useNewsStore();

    React.useEffect(() => {
        const fetchData = async () => {
            await spectaclesStore.loadLastSpectacles({ limit: 4 });
            await newsStore.loadLastNewsForMainPage();
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

    const Banner = () => {
        return (
            <BannerSlider
                transitionTime={1000}
                autoPlay={true}
                swipe={false}
                showArrows={false}
                items={[
                    {
                        url: "./images/banners/banner_2.jpg",
                    },
                    {
                        url: "./images/banners/banner_3.jpg",
                    },
                ]}
            />
        );
    };

    const AboutAndNewsBlock = () => {
        const About = () => {
            return (
                <article className={commonStyles.concord}>
                    <h1 className={commonStyles.title}>О Содружестве</h1>
                    <div className={commonStyles.concordMainText}>
                        <img
                            className={commonStyles.concordImg}
                            src={concordImage}
                            alt='Содружество школьных театров города Москвы'
                        />
                        <p>
                            <b>Дорогие друзья!</b> <br />
                            Мы рады приветствовать вас на портале «Содружество школьных театров города Москвы».
                        </p>
                        <p>
                            Здесь вы можете познакомиться с деятельностью детских и молодежных театров на базе
                            образовательных организаций города Москвы, стать участником или зрителем открытых показов в
                            рамках ежегодного фестиваля-конкурса «Живая сцена» и узнать о проектах Содружества.
                        </p>
                    </div>
                    <NavLink to={"/concord/"} className={commonStyles.linkButton}>
                        Подробнее
                    </NavLink>
                </article>
            );
        };

        const News = () => {
            if (newsStore.lastNewsForMainPage && Object.keys(newsStore.lastNewsForMainPage).length > 0) {
                return (
                    <aside className={commonStyles.news}>
                        <h2 className={commonStyles.title}>Новости</h2>
                        <NavLink to={"/news/" + newsStore.lastNewsForMainPage.ID} className={commonStyles.new}>
                            {newsStore.lastNewsForMainPage.preview_image &&
                                newsStore.lastNewsForMainPage.preview_image !== "" && (
                                    <img
                                        className={commonStyles.newImg}
                                        src={
                                            newsStore.lastNewsForMainPage.preview_image.includes("http")
                                                ? newsStore.lastNewsForMainPage.preview_image
                                                : process.env.REACT_APP_BASE_URL +
                                                  newsStore.lastNewsForMainPage.preview_image
                                        }
                                        alt={newsStore.lastNewsForMainPage.title}
                                    />
                                )}
                            <p className={commonStyles.newDate}>
                                {moment(newsStore.lastNewsForMainPage.date).format("DD MMMM YYYY HH:mm")}
                            </p>
                            <h3 className={commonStyles.newTitle}>{newsStore.lastNewsForMainPage.preview_title}</h3>
                            <p
                                className={commonStyles.newPharagraph}
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(newsStore.lastNewsForMainPage.preview_text),
                                }}
                            />
                        </NavLink>
                        <NavLink to={"/news/"} className={commonStyles.linkButton}>
                            Все новости
                        </NavLink>
                    </aside>
                );
            }
        };

        return (
            <section className={commonStyles.wrap}>
                <div className={commonStyles.twoColumns}>
                    <About />
                    <News />
                </div>
            </section>
        );
    };

    const Spectacles = () => {
        return (
            <section className={commonStyles.wrap}>
                <h2 className={commonStyles.title}>Репертуар школьных театров</h2>
                <div className={commonStyles.cardDeck}>
                    {spectaclesStore.lastSpectacles.map((item) => (
                        <div key={item.ID} className={commonStyles.posterCard}>
                            <NavLink to={"/spectacles/" + item.ID} className={commonStyles.posterCardImgLink}>
                                <img
                                    className={commonStyles.posterCardImg}
                                    src={item.poster === null ? noPhoto : process.env.REACT_APP_BASE_URL + item.poster}
                                    alt={item.title}
                                />
                            </NavLink>
                            <div className={commonStyles.posterCardMainText}>
                                <h3 className={commonStyles.posterCardTitle}>{item.title}</h3>
                                <ul className={commonStyles.posterCardList}>
                                    <li className={commonStyles.posterCardItem}>
                                        Организация:
                                        <span className={commonStyles.posterCardAccent}>{item.schoolTitle}</span>
                                    </li>
                                    <li className={commonStyles.posterCardItem}>
                                        Театр:
                                        <span className={commonStyles.posterCardAccent}>{item.theatreTitle}</span>
                                    </li>
                                    <li className={commonStyles.posterCardItem}>
                                        Дата показа:
                                        <span className={commonStyles.posterCardAccent}>
                                            {moment(item.date).format("DD.MM.YYYY HH:mm")}
                                        </span>
                                    </li>
                                </ul>
                                <div
                                    className={commonStyles.posterCardDescription}
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(truncateString(item.review, 300)),
                                    }}
                                />
                                <div className={commonStyles.posterCardFooter}>
                                    <NavLink
                                        key={item.ID}
                                        to={"/spectacles/" + item.ID}
                                        className={commonStyles.posterCardButton}
                                    >
                                        Подробнее
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <NavLink to={"/spectacles/"} className={commonStyles.linkButton}>
                    Все спектакли
                </NavLink>
            </section>
        );
    };

    const Friends = () => {
        const peoples = [
            {
                name: "Евгений Владимирович Князев",
                position: "Народный артист РФ, ректор Театрального института имени Бориса Щукина.",
                url: "./images/people/Evgeny Vladimirovich Knyazev.jpg",
                qoute: "Сегодня школьные театры кружки и студии - это необходимость. Для детей и старших, и младших - это самый лёгкий и интересный способ соприкосновения с классической литературой. Кроме того, занятия театром, который вбирает в себя практически все виды искусства, способствуют всестороннему развитию личности ребёнка.",
            },
            {
                name: "Юрий Иванович Ерёмин",
                position: "Заслуженный деятель искусств РСФСР, Народный артист РСФСР, режиссёр театра им. Моссовета",
                url: "./images/people/Yuri Ivanovich Eremin.jpg",
                qoute: "С огромным удовольствием поддерживаю инициативу создания «Содружества школьных театров». Возможность участия в постановках раскрывает личность учащихся и формирует лидерские качества, которые пригодятся в любой профессии. Наша страна гордится именами великих педагогов: Выготского, Макаренко, Вышинского. Я от всей души желаю вам с достоинством продолжать дело этих великих людей.",
            },
            {
                name: "Латышев Ян Константинович",
                position: "Актёр театра Романа Виктюка",
                url: "./images/people/Latyshev Yan Konstantinovich.jpg",
                qoute: "Школьный театр - колоссальный ускоритель развития ребёнка. Через игру с невероятной скоростью осваиваются новые знания, модели поведения, способы реагирования на различные ситуации. Школьный театр - прекрасный инструмент социализации, он развивает чувство эмпатии, ребёнок становится более сенситивным, но при этом учится управлять своими эмоциями. Я могу долго перечислять все достоинства школьного театра и что он делает для детей, но красноречивей об этом расскажет моя биография. Я благодарен школьному театральному кружку.",
            },
            {
                name: "Портнягин Алексей",
                position:
                    "преподаватель импровизации, сценической речи, актерского мастерства и пластики, режиссер по пластике",
                url: "./images/people/Alexey Portnyagin.jpg",
                qoute: "Я думаю, что на профессиональный театр в немалой степени влияет театр школьный, в котором воспитываются не столько будущие актеры, а умные, чуткие и мыслящие зрители. Очень здорово, что появилось «Содружество школьных театров» и театр школьников получил возможность вырасти как в культурном, так и в художественном смысле. Есть основание полагать, что в будущем, школьный театр сможет повлиять на общий уровень культуры в обществе.",
            },
            {
                name: "Юрий Ляхов",
                position: "Актер театра и кино, режиссер драматического театра.",
                url: "./images/people/Yuri Lyakhov.jpg",
                qoute: "Как сказал Николай Васильевич Гоголь «Театр - это такая кафедра, с которой можно много сказать миру добра». Но, порой, люди туда приходят уже слишком поздно или вовсе не появляются. Театр крайне необходим, как еще одна форма образования для молодого поколения, с которой можно разговаривать не только рационально, но и эмоционально. Создание содружества школьных театров позволит поднять уровень коллективов и наладит коммуникацию между школьными театрами. А это точно принесёт свои творческие плоды.",
            },
            {
                name: "Ганькина Кристина",
                position:
                    "Режиссер, мастер актерско-речевого курса, педагог по актерскому мастерству и сценической речи АТО-театр.",
                url: "./images/people/Gankina Kristina.jpg",
                qoute: "В школьные годы я училась в политехническом лицее, и у нас были разные лаборатории: биологии, информатики, математики, дизайна, а вот театра не было. И, когда однажды к нам приехали профессиональные артисты ставить небольшой спектакль по случаю юбилея, случился волшебный праздник, после которого мы начали придумывать свои спектакли, бесконечно что-то создавать и интересоваться другими творческими коллективами. В этом и есть, на мой взгляд, настоящее значение школьного театра, развитию которого способствует содружество  - создавать атмосферу творчества, доверия и немного волшебства!",
            },
            {
                name: "Михаил Лукин",
                position: "Артист театра и кино, режиссер драматического театра",
                url: "./images/people/Mikhail Lukin.jpg",
                qoute: "Однажды мой знакомый рассказал такую историю: «В нашем городе люди добрые, а в соседнем злые - говорит он. Почему? - спросил я. А потому что в нашем городе есть театр, а в соседнем его нет - ответил он». И я с ним полностью согласен. А представьте, если в каждой школе будет театр, который воспитает своих актёров и зрителей, значит и добра будет больше. А если эти театры сольются в Содружество школьных театров, то это будет союз единомышленников. И не важно любительский это театр, самодеятельный или профессиональный - любой театр держится на живом общении. На занятиях в театральной студии можно получить комплекс актёрских знаний, владения собой и своим телом, голосом, умение двигаться на сцене, видеть, слышать, а самое главное - возможность познать СЕБЯ.",
            },
            {
                name: "Александр Львович Семчев",
                position: "Заслуженный артист РФ, Актер МХТ им. Чехова",
                url: "./images/people/Alexander Lvovich Semchev.jpg",
                qoute: "В современном мире, где все большее значение имеют цифровые технологии, дающие возможность дистанционной работы и дистанционного общения, все большее значение имеет возможность общения живого. Именно поэтому театральное искусство становится особенно востребованным. Несомненно, что дети, прошедшие через Школьный театр  становятся в первую очередь умными и внимательными зрителями. Поэтому считаю, создание «Содружества Школьных театров» в Москве не только актуальной, но и важнейшей культурной и образовательной инициативой. Желаю «Содружеству» творческих успехов и максимального вовлечения в его работу московских школьников",
            },
            {
                name: "Несвячёная Ксения",
                position: "Актриса театра, педагог актерского мастерства, режиссер-постановщик. ",
                url: "./images/people/Unholy Xenia.jpg",
                qoute: "Особую ступень в развитие человеческой личности всегда будет занимать искусство. Но наиболее ценно, когда это искусство возможно создавать самому. Школьные театры дают такую возможность для ребят всех возрастов. «Содружество школьных театров» - это, прежде всего, собрание особенных людей, объединённых общей идеей и стремлением к познанию.",
            },
        ];

        return (
            <section className={commonStyles.section}>
                <article className={commonStyles.wrap}>
                    <h2 className={commonStyles.title}>Друзья содружества</h2>
                    <Splide
                        className='my-splide my-splide_linear-gradient my-splide_arrow_primary'
                        options={{
                            type: "loop",
                            arrows: false,
                            perPage: 1,
                            perMove: 1,
                            gap: "1.5em",
                            padding: ".75em",
                            rewind: true,
                            autoplay: true,
                            mediaQuery: "min",
                            breakpoints: {
                                1200: {
                                    perPage: 2,
                                    focus: "center",
                                    arrows: true,
                                    padding: "0",
                                    gap: ".675em",
                                },
                            },
                        }}
                    >
                        {peoples.map((item, index) => (
                            <SplideSlide data-splide-interval='5000' key={index}>
                                <div className={commonStyles.qoute}>
                                    <img className={commonStyles.qouteImg} src={item.url} alt={item.name} />
                                    <h3 className={commonStyles.qouteTitle}>
                                        {item.name}
                                        <span className={commonStyles.qouteTitleSpan}>{item.position}</span>
                                    </h3>
                                    <blockquote className={commonStyles.qouteText}>{item.qoute}</blockquote>
                                </div>
                            </SplideSlide>
                        ))}
                    </Splide>
                </article>
            </section>
        );
    };

    const Partners = () => {
        return (
            <section className={commonStyles.section}>
                <article className={commonStyles.wrap}>
                    <h2 className={commonStyles.title}>События партнеров</h2>
                    <Splide
                        className='my-splide'
                        options={{
                            type: "loop",
                            arrows: false,
                            perPage: 1,
                            perMove: 1,
                            gap: "1.875em",
                            rewind: true,
                            pauseOnHover: true,
                            autoplay: true,
                            mediaQuery: "min",
                            breakpoints: {
                                768: {
                                    perPage: 2,
                                },
                                1200: {
                                    perPage: 3,
                                },
                            },
                        }}
                    >
                        {[].map((item, index) => (
                            <SplideSlide data-splide-interval='5000' key={index}>
                                <div className={commonStyles.card}>
                                    <div className={commonStyles.cardImage}>
                                        <img src={item.src} alt={item.title} />
                                        <Button
                                            extraClass={commonStyles.cardButton}
                                            type='button'
                                            theme={"public_primary"}
                                            size={"small"}
                                            text='Билеты'
                                        />
                                    </div>
                                    <p className={commonStyles.cardAgeRange}>
                                        Спектакль <br />
                                        {item.ageRange}
                                    </p>
                                    <h3 className={commonStyles.cardTitle}>{item.title}</h3>
                                    <ul className={commonStyles.cardList}>
                                        <li className={commonStyles.cardItem}>{item.school}</li>
                                        <li className={commonStyles.cardItem}>{item.date}</li>
                                    </ul>
                                </div>
                            </SplideSlide>
                        ))}
                    </Splide>
                </article>
            </section>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
        >
            <Banner />
            <AboutAndNewsBlock />
            <Spectacles />
            <Friends />
        </motion.div>
    );
};

export default MainPage;
