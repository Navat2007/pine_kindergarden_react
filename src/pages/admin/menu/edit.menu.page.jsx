import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";

import useMenuStore from "../../../store/admin/menuStore";

import TitleBlock from "../../../components/admin/title.block/title.block.component";
import FieldText from "../../../components/admin/field/field.text.component";
import Button from "../../../components/admin/button/button.component";
import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import {GenerateUrl} from "../../../utils/generateUrl";
import FieldSelect from "../../../components/admin/field/field.select.component";

import {AdminIcons} from "../../../components/svgs";
import {getMenuList} from "../../../services/menu";

const EditMenuPage = () => {
    let {id} = useParams();
    const navigate = useNavigate();
    const {register, handleSubmit, reset, getValues, setValue} = useForm();

    const [popup, setPopup] = React.useState(<></>);

    const store = useMenuStore;

    const back = () => navigate(`/admin/menu`);

    React.useLayoutEffect(() => {
        const fetchData = async () => {
            const response = await store.loadByID({id});

            if (response) {
                reset({});

                if(response.page !== 0 && response.custom_page === 1)
                    setValue("url", GenerateUrl(response.title));
                else if(response.page === 1 && response.custom_page === 0)
                    setValue("url", response.url);
            }
        };

        fetchData();
    }, []);

    const checkForComplete = (sendObject) => {
        if (!sendObject.title) {
            setPopup(
                <AlertPopup
                    title='Ошибка'
                    text={"Название должно быть заполнено."}
                    opened={true}
                    onClose={() => {
                        setPopup(<></>);
                    }}
                />
            );

            return false;
        }

        return true;
    };

    const onEdit = async () => {
        const data = getValues();

        let sendObject = {...data};

        if (!checkForComplete(sendObject))
            return;

        sendObject["id"] = id;
        sendObject["parentID"] = store.item.value.parentID;

        if(data.type === "Пользовательская страница") {
            sendObject["page"] = 1;
            sendObject["custom_page"] = 1;
            sendObject["url"] = GenerateUrl(data.title);
        } else if(data.type === "Содержит подменю") {
            sendObject["page"] = 0;
            sendObject["custom_page"] = 0;
            sendObject["url"] = "";
        }
        else {
            sendObject["page"] = 1;
            sendObject["custom_page"] = 0;
            sendObject["url"] = getValues("type");
        }

        await store.edit(sendObject);

        if (!store.error.value) {
            setPopup(
                <AlertPopup
                    title=''
                    text={"Пункт меню успешно отредактирован"}
                    opened={true}
                    onClose={async () => {
                        await getMenuList();
                        back();
                    }}
                />
            );
        } else {
            setPopup(
                <AlertPopup
                    title='Ошибка'
                    text={store.error.value}
                    opened={true}
                    onClose={() => {
                        setPopup(<></>);
                    }}
                />
            );
        }
    };

    const onDelete = async () => {
        if(getValues("type") === "Содержит подменю" && store.item.value.submenu > 0) {
            setPopup(<AlertPopup
                title='Ошибка'
                text={`Не возможно удалить меню, т.к. меню содержит ${store.item.value.submenu} подменю`}
                opened={true}
                onClose={() => {
                    setPopup(<></>);
                }}
            />);

            return;
        }

        setPopup(
            <AlertPopup
                text={`Вы уверены что хотите удалить? ${store.item.value.custom_page === 1 ? " Вместе с пунктом меню, будет удалена страница" : ""}`}
                opened={true}
                onClose={() => setPopup(<></>)}
                buttons={
                    <>
                        <Button type='button' theme='text' onClick={() => setPopup(<></>)}
                                spinnerActive={store.sending.value}>
                            Нет
                        </Button>
                        <Button
                            type='button'
                            onClick={async () => {
                                let sendObject = {};

                                sendObject["id"] = id;

                                await store.remove(sendObject);

                                if (!store.error.value) {
                                    setPopup(
                                        <AlertPopup
                                            title=''
                                            text={"Пункт меню удален"}
                                            opened={true}
                                            onClose={async () => {
                                                back();
                                                await getMenuList();
                                            }}
                                        />
                                    );
                                } else {
                                    setPopup(
                                        <AlertPopup
                                            title='Ошибка'
                                            text={store.error.value}
                                            opened={true}
                                            onClose={() => {
                                                setPopup(<></>);
                                            }}
                                        />
                                    );
                                }
                            }}
                            spinnerActive={store.sending.value}
                        >
                            Да
                        </Button>
                    </>
                }
            />
        );
    };

    const getDefaultSelectItem = () => {
        if(store.item?.value?.custom_page === 1)
            return "Пользовательская страница";

        if(store.item?.value?.page === 0)
            return "Содержит подменю";

        return store.item?.value?.url;
    }

    return (
        <BasicPage mainStore={store} loadings={[store]}>
            <TitleBlock title={`Редактирование ID: ${id}`} onBack={back}/>
            <form onSubmit={handleSubmit(onEdit)} className='admin-form'>
                <div className='admin-form__two-columns'>
                    <fieldset className='admin-form__section'>
                        <FieldText
                            label={"Название*"}
                            required={true}
                            placeholder={"Введите название"}
                            {...register("title", {
                                value: store.item.value.title,
                            })}
                            onChange={(e) => {
                                if(getValues("type") === "Пользовательская страница") {
                                    setValue("url", GenerateUrl(e.target.value));
                                }
                                else if (getValues("type") === "Содержит подменю") {
                                    setValue("url", "");
                                }
                                else {
                                    setValue("url", getValues("type"));
                                }
                            }}
                        />
                        <FieldText
                            label={"Ссылка"}
                            required={false}
                            placeholder={""}
                            disabled={true}
                            {...register("url")}
                        />
                        <FieldSelect
                            label={"Тип меню"}
                            required={true}
                            defaultSelectItem={null}
                            flatOptions={<>
                                <option value="Пользовательская страница">Пользовательская страница</option>
                                <option value="Содержит подменю">Содержит подменю</option>
                                <optgroup label=""/>
                                <optgroup label="Системные страницы">
                                    <option value="/">Главная</option>
                                    <option value="платные-услуги">Платные услуги</option>
                                    <option value="сотрудники">Сотрудники</option>
                                    <option value="группы">Группы</option>
                                    <option value="питание">Питание</option>
                                    <option value="новости">Новости</option>
                                    <option value="о-нас">О нас</option>
                                    <option value="контакты">Контакты</option>
                                </optgroup>
                            </>}
                            {...register("type", {
                                value: getDefaultSelectItem(),
                            })}
                            onChange={(e) => {
                                if(getValues("type") === "Содержит подменю" && store.item.value.submenu > 0) {
                                    setValue("type", "Содержит подменю");
                                    setPopup(<AlertPopup
                                        title='Ошибка'
                                        text={"Не возможно изменить тип меню, т.к. меню содержит страницы"}
                                        opened={true}
                                        onClose={() => {
                                            setPopup(<></>);
                                        }}
                                    />);
                                }

                                if(store.item.value.custom_page === 1 && e.target.value !== "Пользовательская страница") {
                                    setPopup(<AlertPopup
                                        title='Внимание'
                                        text={"При сохранении информация привязанная к этой странице будет удалена!"}
                                        opened={true}
                                        onClose={() => {
                                            setPopup(<></>);
                                        }}
                                    />);
                                }

                                if(e.target.value === "Пользовательская страница") {
                                    setValue("url", GenerateUrl(getValues("title")));
                                } else if (e.target.value === "Содержит подменю") {
                                    setValue("url", "");
                                }
                                else {
                                    setValue("url", GenerateUrl(e.target.value));
                                }
                            }}
                        />
                    </fieldset>
                </div>
                <div className='admin-form__controls'>
                    <Button type='submit' extraClass='admin-form__button' spinnerActive={store.sending.value}>
                        Сохранить
                    </Button>
                    <Button
                        type='button'
                        extraClass='admin-form__button'
                        theme='text'
                        onClick={back}
                        spinnerActive={store.sending.value}
                    >
                        Отмена
                    </Button>
                    <Button
                        type='button'
                        iconName={AdminIcons.delete}
                        theme='text-error'
                        onClick={onDelete}
                        spinnerActive={store.sending.value}
                    >
                        Удалить
                    </Button>
                </div>
            </form>
            {popup}
        </BasicPage>
    );
};

export default EditMenuPage;