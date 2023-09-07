import React from "react";
import "./contact.scss";

const Contact = () => {
    return (
        <section className='contact main-section'>
            <div className='contact__map' id='contact_map'></div>
            <div className='contact__detail'>
                <h2 className='contact__title'>Контакты</h2>
                <address className='contact__address'>
                    Адрес:&nbsp;город&nbsp;Москва, улица&nbsp;Тверская, дом&nbsp;15 <br />
                    Телефон:{" "}
                    <a className='contact__link' href='tel:84951111111' rel='noopener nofollow noreferer'>
                        +7&nbsp;(495)&nbsp;111-11-11
                    </a>
                    <br />
                    E-mail:&nbsp;
                    <a className='contact__link' href='mailto:kindergarden@forest.ru' rel='noopener nofollow noreferer'>
                        kindergarden@forest.ru
                    </a>
                </address>
            </div>
        </section>
    );
};

export default Contact;
