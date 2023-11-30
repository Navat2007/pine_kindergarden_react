import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isArray } from "lodash";
import { getMenuList } from "../../../services/menu";

import useMenuStore from "../../../store/admin/menuStore";
import useCustomPagesStore from "../../../store/admin/customPagesStore";

import Editor from "../../../components/general/reach.editor/editor.component";
import Tabs from "../../../components/general/tabs/tabs.component";
import Tab from "../../../components/general/tabs/tab.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";
import FieldText from "../../../components/admin/field/field.text.component";
import Button from "../../../components/admin/button/button.component";
import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import { GenerateUrl } from "../../../utils/generateUrl";

import { AdminIcons } from "../../../components/svgs";
import UrlsSelector from "../../../components/admin/urls.selector/urls.selector";
import { signal } from "@preact/signals-react";

const photo = signal([]);
const video = signal([]);
const files = signal([]);

const EditCustomPagesPage = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const { register, control, handleSubmit, reset, getValues, setValue } = useForm();

    const [popup, setPopup] = React.useState(<></>);

    const store = useCustomPagesStore();
    const menuStore = useMenuStore;

    const back = () => navigate(`/admin/customPages`);

    React.useLayoutEffect(() => {
        const fetchData = async () => {
            reset();

            const data = await store.loadByID({ id });
            const menu = await menuStore.loadByID({ id });

            if (!data || (isArray(data) && data.length === 0)) {
                setValue("title", menu.title);
                setValue("url", GenerateUrl(menu.title));
                setValue("content", "");
            } else {
                setValue("content", data.content);
                setValue("title", data.title);
                setValue("url", GenerateUrl(data.title));

                data.files.map((item) => {
                    switch (item.type) {
                        case "photo":
                            photo.value.push({
                                id: window.global.makeid(12),
                                url: item.url
                            })
                            break;

                        case "video":
                            video.value.push({
                                id: window.global.makeid(12),
                                url: item.url
                            })
                            break;

                        case "file":
                            files.value.push({
                                id: window.global.makeid(12),
                                url: item.url,
                                title: item.title
                            })
                            break;
                    }
                })
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

        let sendObject = { ...data };

        if (!checkForComplete(sendObject)) return;

        sendObject["id"] = id;
        sendObject["photo"] = photo.value.filter((item) => item.url).map(item => item.url);
        sendObject["video"] = video.value.filter((item) => item.url).map(item => item.url);
        sendObject["files"] = files.value.filter((item) => item.url).map(item => {
            return {
                title: item.title,
                url: item.url
            }
        });

        const response = await store.edit(sendObject);

        if (response.error === 0) {
            setPopup(
                <AlertPopup
                    title=''
                    text={"Страница успешно отредактирована"}
                    opened={true}
                    onClose={async () => {
                        photo.value = [];
                        video.value = [];
                        files.value = [];
                        back();
                    }}
                />
            );
        } else {
            setPopup(
                <AlertPopup
                    title='Ошибка'
                    text={response.error_text}
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
                        <Button
                            type='button'
                            theme='text'
                            onClick={() => setPopup(<></>)}
                            spinnerActive={store.sending.value}
                        >
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
                                            text={"Страница и пункт меню удалены"}
                                            opened={true}
                                            onClose={async () => {
                                                photo.value = [];
                                                video.value = [];
                                                files.value = [];
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
            <TitleBlock title={`Страница ID: ${id}`} onBack={back} />
            <form onSubmit={handleSubmit(onEdit)} className='admin-form'>
                <Tabs>
                    <Tab title={"Основная информация"}>
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
                                <p className='admin-form__subtitle'>Содержание страницы</p>
                                <Editor control={control} name='content' minHeight={250} buttons={{ link: true }} />
                            </fieldset>
                        </div>
                    </Tab>
                    <Tab title={"Фотографии"}>
                        <fieldset className='admin-form__section admin-form__section_width_one-col'>
                            <h2 className='admin-form__title'>Фотографии</h2>
                            <UrlsSelector items={photo} withFiles={true} accept={"image/*"}/>
                        </fieldset>
                    </Tab>
                    <Tab title={"Видео"}>
                        <fieldset className='admin-form__section admin-form__section_width_one-col'>
                            <h2 className='admin-form__title'>Видео</h2>
                            <UrlsSelector items={video} />
                        </fieldset>
                    </Tab>
                    <Tab title={"Файлы"}>
                        <fieldset className='admin-form__section admin-form__section_width_one-col'>
                            <h2 className='admin-form__title'>Файлы</h2>
                            <UrlsSelector items={files} withFiles={true} />
                        </fieldset>
                    </Tab>
                </Tabs>
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
