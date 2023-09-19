import React from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";

import "./not-found.scss";
import { AdminIcons } from "../../components/svgs";

const Page404 = () => {
    return (
        <>
            <Helmet>
                <title>Страница не найдена</title>
            </Helmet>
            <main className='not-found'>
                <section className='not-found__inner'>
                    <h1 className='not-found__title'>
                        <span className='not-found__span-accent'>404!</span>
                        Страница не найдена.
                    </h1>
                    <p className='not-found__text'>
                        К сожалению, запрашиваемая Вами страница, не найдена.
                        <br />
                        Повторите попытку позже.
                        <br />
                        <br />
                        <NavLink className={"not-found__link"} to={"/"}>
                            Вернуться на главную {AdminIcons.open_in_new}
                        </NavLink>
                    </p>
                </section>
            </main>
        </>
    );
};

export default Page404;
