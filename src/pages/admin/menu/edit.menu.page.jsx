import React from 'react';
import {useNavigate, useParams} from "react-router-dom";

import useMenuStore from "../../../store/admin/menuStore";
import TitleBlock from "../../../components/admin/title.block/title.block.component";
import FieldText from "../../../components/admin/field/field.text.component";
import FileSelector from "../../../components/general/file.selector/file.selector.component";
import Button from "../../../components/admin/button/button.component";
import {AdminIcons} from "../../../components/svgs";
import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import {useForm} from "react-hook-form";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import {GenerateUrl} from "../../../utils/generateUrl";
import FieldSelect from "../../../components/admin/field/field.select.component";

const EditMenuPage = () => {
    let {id} = useParams();
    const navigate = useNavigate();
    const {register, handleSubmit, reset, getValues, setValue} = useForm();

    const [popup, setPopup] = React.useState(<></>);

    const store = useMenuStore;

    const back = () => navigate(`/admin/menu`);

    React.useLayoutEffect(() => {
        const fetchData = async () => {
            const response = await store.loadByID({id}, true);

            if (response) {
                reset(response);
                setValue("url", GenerateUrl(store.item.value.title));
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

        return false;
    };

    const onEdit = async () => {
        const data = getValues();

        let sendObject = {...data};

        if (!checkForComplete(sendObject)) return;

        sendObject["id"] = id;

        await store.edit(sendObject);

        if (!store.error) {
            setPopup(
                <AlertPopup
                    title=''
                    text={"Пункт меню успешно отредактирован"}
                    opened={true}
                    onClose={back}
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
                text={"Вы уверены что хотите удалить?"}
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
                                            onClose={() => {
                                                setPopup(<></>);
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
                                setValue("url", GenerateUrl(e.target.value));
                            }}
                        />
                        <FieldText
                            label={"Ссылка"}
                            required={false}
                            placeholder={""}
                            disabled={true}
                            {...register("url", {
                                value: GenerateUrl(store.item.value.title),
                            })}
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
                                console.log(getValues("type"));
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