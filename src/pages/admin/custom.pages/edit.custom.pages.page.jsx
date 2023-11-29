import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {getMenuList} from "../../../services/menu";

import useMenuStore from "../../../store/admin/menuStore";
import useCustomPagesStore from "../../../store/admin/customPagesStore";

import TitleBlock from "../../../components/admin/title.block/title.block.component";
import FieldText from "../../../components/admin/field/field.text.component";
import Button from "../../../components/admin/button/button.component";
import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import {GenerateUrl} from "../../../utils/generateUrl";

import {AdminIcons} from "../../../components/svgs";
import {isArray} from "lodash";

const EditCustomPagesPage = () => {
    let {id} = useParams();
    const navigate = useNavigate();
    const {register, handleSubmit, reset, getValues, setValue} = useForm();

    const [popup, setPopup] = React.useState(<></>);

    const store = useCustomPagesStore();
    const menuStore = useMenuStore;

    const back = () => navigate(`/admin/customPages`);

    React.useLayoutEffect(() => {
        const fetchData = async () => {
            reset();

            const data = await store.loadByID({id});
            const menu = await menuStore.loadByID({id});

            console.log(data);
            console.log(menu);

            if(!data || (isArray(data) && data.length === 0)) {
                setValue("title", menu.title);
                setValue("url", GenerateUrl(menu.title));
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
    };

    const onDelete = async () => {
        setPopup(
            <AlertPopup
                text={"Вы уверены что хотите удалить? Вместе со страницей, будет удален пункт меню."}
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

    return (
        <BasicPage mainStore={store} loadings={[store, menuStore]}>
            <TitleBlock title={`Страница ID: ${id}`} onBack={back}/>
            <form onSubmit={handleSubmit(onEdit)} className='admin-form'>
                <div className='admin-form__two-columns'>
                    <fieldset className='admin-form__section'>
                        <FieldText
                            label={"Название*"}
                            required={true}
                            placeholder={"Введите название"}
                            {...register("title", {
                                value: store.item.value?.title,
                            })}
                            onChange={(e) => {
                                setValue("url", GenerateUrl(e.target.value));
                            }}
                        />
                        <FieldText
                            label={"Ссылка"}
                            required={false}
                            placeholder={""}
                            disabled={true}
                            {...register("url")}
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

export default EditCustomPagesPage;