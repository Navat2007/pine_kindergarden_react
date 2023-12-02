import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";

import {getMenuList} from "../../../services/menu";
import useMenuStore from "../../../store/admin/menuStore";

import TitleBlock from "../../../components/admin/title.block/title.block.component";
import FieldText from "../../../components/admin/field/field.text.component";
import Button from "../../../components/admin/button/button.component";
import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import {GenerateUrl} from "../../../utils/generateUrl";
import FieldSelect from "../../../components/admin/field/field.select.component";

const AddMenuPage = () => {
    let {id, sorting} = useParams();
    const navigate = useNavigate();
    const {register, handleSubmit, reset, getValues, setValue} = useForm();

    const [popup, setPopup] = React.useState(<></>);
    const [urlFieldDisabled, setUrlFieldDisabled] = React.useState(true);

    const store = useMenuStore;

    const back = () => navigate(`/admin/menu`);

    React.useEffect(() => {
        store.loadAll(undefined, undefined, false);
        console.log(id);
        console.log(sorting);
        reset();
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

    const getItemsForParentSelect = () => {
        let items = [{
            value: 0,
            title: "Верхний уровень",
        }];

        if(store.items.value && store.items.value.all) {
            store.items.value.all.map((item) => {
                if(item.page === 0){
                    items.push({
                        value: item.ID,
                        title: item.title,
                    });
                }
            })
        }

        return items;
    };

    const onAdd = async () => {
        const data = getValues();

        let sendObject = {...data};

        if (!checkForComplete(sendObject))
            return;

        sendObject["parentID"] = getValues("parent");
        sendObject["page"] = 1;
        sendObject["external"] = 0;
        sendObject["custom_page"] = 0;

        const parentItems = store.items.value.all.filter(item => item.parentID === parseInt(getValues("parent")));
        sendObject["sorting"] = parentItems[parentItems.length - 1].sorting + 1;

        if(data.type === "Пользовательская страница") {
            sendObject["custom_page"] = 1;
            sendObject["url"] = GenerateUrl(data.title);
        } else if(data.type === "Содержит подменю") {
            sendObject["page"] = 0;
            sendObject["url"] = "";
        }
        else if(data.type === "Внешняя ссылка") {
            sendObject["external"] = 1;
            sendObject["url"] = getValues("url");
        }
        else {
            sendObject["url"] = getValues("type");
        }

        await store.add(sendObject);

        if (!store.error.value) {
            setPopup(
                <AlertPopup
                    title=''
                    text={"Пункт меню успешно добавлен"}
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

    return (
        <BasicPage mainStore={store} loadings={[store]}>
            <TitleBlock title={`Создание пункта меню`} onBack={back}/>
            <form onSubmit={handleSubmit(onAdd)} className='admin-form'>
                <div className='admin-form__two-columns'>
                    <fieldset className='admin-form__section'>
                        <FieldText
                            label={"Название*"}
                            required={true}
                            placeholder={"Введите название"}
                            {...register("title")}
                            onChange={(e) => {
                                if(getValues("type") === "Пользовательская страница") {
                                    setValue("url", GenerateUrl(e.target.value));
                                }
                                else if (getValues("type") === "Содержит подменю") {
                                    setValue("url", "");
                                }
                                else if (getValues("type") === "Внешняя ссылка") {

                                }
                                else {
                                    setValue("url", getValues("type"));
                                }
                            }}
                        />
                        <FieldText
                            label={"Ссылка"}
                            required={!urlFieldDisabled}
                            placeholder={""}
                            disabled={urlFieldDisabled}
                            {...register("url")}
                        />
                        <FieldSelect
                            label={"Тип меню"}
                            required={true}
                            defaultSelectItem={null}
                            flatOptions={<>
                                <option value="Пользовательская страница">Пользовательская страница</option>
                                <option value="Внешняя ссылка">Внешняя ссылка</option>
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
                            {...register("type")}
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

                                if(e.target.value === "Пользовательская страница") {
                                    setValue("url", GenerateUrl(getValues("title")));
                                } else if (e.target.value === "Содержит подменю") {
                                    setValue("url", "");
                                }
                                else if (e.target.value === "Внешняя ссылка") {
                                    setValue("url", "");
                                    setUrlFieldDisabled(false);
                                }
                                else {
                                    setValue("url", GenerateUrl(e.target.value));
                                }
                            }}
                        />
                        <FieldSelect
                            label={"Уровень меню"}
                            defaultSelectItem={null}
                            selectItems={getItemsForParentSelect()}
                            {...register("parent", {
                                value: id,
                            })}
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
                </div>
            </form>
            {popup}
        </BasicPage>
    );
};

export default AddMenuPage;