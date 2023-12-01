import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import moment from "moment";

import useNewsStore from "../../../store/admin/newsStore";

import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import Button from "../../../components/admin/button/button.component";
import Tabs from "../../../components/general/tabs/tabs.component";
import Tab from "../../../components/general/tabs/tab.component";
import Editor from "../../../components/general/reach.editor/editor.component";
import ImageSelector from "../../../components/admin/image.selector/image.selector.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";
import FieldCheckbox from "../../../components/admin/field/field.checkbox.component";
import FieldText from "../../../components/admin/field/field.text.component";
import FieldDate from "../../../components/admin/field/field.date.component";

import { AdminIcons } from "../../../components/svgs";

const AdminNewsPage = (props) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, control, setValue, getValues } = useForm();

    const store = useNewsStore();

    const back = () => navigate(`/admin/news/${id}`);

    const [photo, setPhoto] = React.useState([]);
    const [photoPreview, setPhotoPreview] = React.useState([]);
    const [photoReview, setPhotoReview] = React.useState([]);
    const [popup, setPopup] = React.useState(<></>);

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadByID({ id });
        };

        reset();
        fetchData();

        setValue("editorPreview", store.item.preview_text);
        setValue("editorReview", store.item.text);

        setPhotoPreview(
            store.item.preview_image
                ? [
                    {
                        ID: store.item.ID,
                        url: store.item.preview_image,
                        main: 1,
                        order: 1,
                        isFile: 1,
                        isLoaded: 1,
                    },
                ]
                : []
        );

        setPhotoReview(
            store.item.image
                ? [
                    {
                        ID: store.item.ID,
                        url: store.item.image,
                        main: 1,
                        order: 1,
                        isFile: 1,
                        isLoaded: 1,
                    },
                ]
                : []
        );

        setPhoto(store.item.images ? store.item.images : []);
    }, []);

    const checkForComplete = (sendObject) => {
        if (!sendObject.previewTitle) {
            setPopup(
                <AlertPopup
                    title='Ошибка'
                    text={"Название для анонса должно быть заполнено."}
                    opened={true}
                    onClose={() => {
                        setPopup(<></>);
                    }}
                />
            );
            return false;
        }

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

        if (sendObject.date === "") {
            setPopup(
                <AlertPopup
                    title='Ошибка'
                    text={"Дата должна быть заполнена."}
                    opened={true}
                    onClose={() => {
                        setPopup(<></>);
                    }}
                />
            );
            return false;
        }

        if (!sendObject.editorPreview || sendObject.editorPreview === "<p><br></p>") {
            setPopup(
                <AlertPopup
                    title='Ошибка'
                    text={"Описание для анонса должно быть заполнено."}
                    opened={true}
                    onClose={() => {
                        setPopup(<></>);
                    }}
                />
            );
            return false;
        }

        if (!sendObject.editorReview || sendObject.editorReview === "<p><br></p>") {
            setPopup(
                <AlertPopup
                    title='Ошибка'
                    text={"Детальное описание должно быть заполнено."}
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

    const onEdit = async (params) => {
        const data = getValues();

        let sendObject = { ...data };

        sendObject["id"] = id;
        sendObject["previewImage"] = photoPreview;
        sendObject["reviewImage"] = photoReview;
        sendObject["images"] = photo;

        if (!checkForComplete(sendObject)) return;

        await store.edit(sendObject);

        if (!store.error) {
            setPopup(
                <AlertPopup
                    title=''
                    text={"Новость успешно отредактирована"}
                    opened={true}
                    onClose={back}
                />
            );
        } else {
            setPopup(
                <AlertPopup
                    title='Ошибка'
                    text={store.errorText}
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
                        <Button type='button' theme='text' onClick={() => setPopup(<></>)} spinnerActive={store.sending}>
                            Нет
                        </Button>
                        <Button
                            type='button'
                            onClick={async () => {
                                let sendObject = {};

                                sendObject["id"] = id;
                                sendObject["archive"] = 1;

                                await store.remove(sendObject);

                                if (!store.error) {
                                    setPopup(
                                        <AlertPopup
                                            title=''
                                            text={"Новость удалена"}
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
                                            text={store.errorText}
                                            opened={true}
                                            onClose={() => {
                                                setPopup(<></>);
                                            }}
                                        />
                                    );
                                }
                            }}
                            spinnerActive={store.sending}
                        >
                            Да
                        </Button>
                    </>
                }
            />
        );
    };

    const handleDeleteImages = async (item) => {
        let sendObject = { ...item };

        sendObject["place"] = "images";
        sendObject["newsID"] = id;

        await store.removeFile(sendObject);
    };

    const handleDeletePreviewPhoto = async (item) => {
        let sendObject = { ...item };

        sendObject["place"] = "preview";
        sendObject["newsID"] = id;

        await store.removeFile(sendObject);
    };

    const handleDeleteReviewPhoto = async (item) => {
        let sendObject = { ...item };

        sendObject["place"] = "review";
        sendObject["newsID"] = id;

        await store.removeFile(sendObject);
    };

    return (
        <BasicPage mainStore={store} loadings={[store]}>
            <TitleBlock title={`Редактирование новости ID: ${id}`} onBack={back} />
            <form onSubmit={handleSubmit(onEdit)} className='admin-form'>
                <Tabs>
                    <Tab title={"Основная информация"}>
                        <fieldset className='admin-form__section admin-form__section_width_one-col'>
                            <FieldCheckbox
                                label={"Доступна для показа?"}
                                {...register("active", {
                                    value: store.item.active === "Активен",
                                })}
                            />
                            <FieldCheckbox
                                label={"Показывать на главной странице?"}
                                {...register("mainPage", {
                                    value: store.item.show_on_main_page === "Активен",
                                })}
                            />
                            <FieldDate
                                label='Дата и время'
                                type='datetime-local'
                                required={true}
                                {...register("date", {
                                    value: moment(store.item.date).format("YYYY-MM-DD HH:mm"),
                                })}
                            />
                        </fieldset>
                        <fieldset className='admin-form__section'>
                            <FieldText
                                label={"Название новости для анонса*"}
                                required={true}
                                placeholder={"Введите название"}
                                {...register("previewTitle", {
                                    value: store.item.preview_title,
                                })}
                            />
                            <FieldText
                                label={"Название новости*"}
                                required={true}
                                placeholder={"Введите название"}
                                {...register("title", {
                                    value: store.item.title,
                                })}
                            />
                            <p className='admin-form__subtitle'>Описание для анонса</p>
                            <Editor
                                control={control}
                                name='editorPreview'
                                minHeight={250}
                                buttons={{ link: true }}
                            />
                            <p className='admin-form__subtitle'>Детальное описание</p>
                            <Editor
                                control={control}
                                name='editorReview'
                                minHeight={250}
                                buttons={{ link: true }}
                            />
                        </fieldset>
                    </Tab>
                    <Tab title={"Фотографии"}>
                        <h2 className='admin-form__title'>Картинка для анонса</h2>
                        <ImageSelector
                            items={photoPreview}
                            onlyOneFile={true}
                            multiFiles={false}
                            onChange={(items) => setPhotoPreview(items)}
                            onDelete={handleDeletePreviewPhoto}
                        />
                        <h2 className='admin-form__title'>Детальная картинка</h2>
                        <ImageSelector
                            items={photoReview}
                            onlyOneFile={true}
                            multiFiles={false}
                            onChange={(items) => setPhotoReview(items)}
                            onDelete={handleDeleteReviewPhoto}
                        />
                        <h2 className='admin-form__title'>Фото галерея</h2>
                        <ImageSelector
                            items={photo}
                            multiFiles={true}
                            onChange={(items) => setPhoto(items)}
                            onDelete={handleDeleteImages}
                        />
                    </Tab>
                </Tabs>
                <div className='admin-form__controls'>
                    <Button type='submit' extraClass='admin-form__button' spinnerActive={store.sending}>
                        Сохранить
                    </Button>
                    <Button
                        type='button'
                        extraClass='admin-form__button'
                        theme='text'
                        onClick={back}
                        spinnerActive={store.sending}
                    >
                        Отмена
                    </Button>
                    <Button
                        type='button'
                        iconName={AdminIcons.delete}
                        theme='text-error'
                        onClick={onDelete}
                        spinnerActive={store.sending}
                    >
                        Удалить
                    </Button>
                </div>
            </form>
            {popup}
        </BasicPage>
    );
};

export default AdminNewsPage;
