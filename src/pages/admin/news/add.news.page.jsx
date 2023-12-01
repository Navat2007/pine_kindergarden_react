import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

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

const AdminNewsPage = (props) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, control, setValue, getValues } = useForm();

    const store = useNewsStore();

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadByID({ id });
        };

        reset();
        fetchData();
    }, []);

    const back = () => navigate("/admin/news");

    const [photo, setPhoto] = React.useState([]);
    const [photoPreview, setPhotoPreview] = React.useState([]);
    const [photoReview, setPhotoReview] = React.useState([]);
    const [popup, setPopup] = React.useState(<></>);

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

    const onAdd = async (params) => {
        const data = getValues();

        let sendObject = { ...data };

        sendObject["previewImage"] = photoPreview;
        sendObject["reviewImage"] = photoReview;
        sendObject["images"] = photo;

        if (!checkForComplete(sendObject)) return;

        await store.add(sendObject);

        if (!store.error) {
            setPopup(
                <AlertPopup
                    title=''
                    text={"Новость успешно добавлена"}
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

    return (
        <BasicPage mainStore={store} loadings={[store]}>
            <TitleBlock title={"Создание новости"} onBack={back} />
            <form onSubmit={handleSubmit(onAdd)} className='admin-form'>
                <Tabs>
                    <Tab title={"Основная информация"}>
                        <fieldset className='admin-form__section admin-form__section_width_one-col'>
                            <FieldCheckbox
                                label={"Доступна для показа?"}
                                {...register("active", {
                                    value: true,
                                })}
                            />
                            <FieldCheckbox
                                label={"Показывать на главной странице?"}
                                {...register("mainPage")}
                            />
                            <FieldDate
                                label='Дата и время'
                                type='datetime-local'
                                required={true}
                                {...register("date")}
                            />
                        </fieldset>
                        <fieldset className='admin-form__section'>
                            <FieldText
                                label={"Название новости для анонса*"}
                                required={true}
                                placeholder={"Введите название"}
                                {...register("previewTitle")}
                            />
                            <FieldText
                                label={"Название новости*"}
                                required={true}
                                placeholder={"Введите название"}
                                {...register("title")}
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
                            title='Картинка для анонса'
                            items={photoPreview}
                            onlyOneFile={true}
                            multiFiles={false}
                            onChange={(items) => setPhotoPreview(items)}
                        />
                        <h2 className='admin-form__title'>Детальная картинка</h2>
                        <ImageSelector
                            items={photoReview}
                            onlyOneFile={true}
                            multiFiles={false}
                            onChange={(items) => setPhotoReview(items)}
                        />
                        <h2 className='admin-form__title'>Фото галерея</h2>
                        <ImageSelector
                            title='Фото галерея'
                            items={photo}
                            multiFiles={true}
                            onChange={(items) => setPhoto(items)}
                        />
                    </Tab>
                </Tabs>
                <div className='admin-form__controls'>
                    <Button extraClass={"admin-form__button"} type='submit' spinnerActive={store.sending}>
                        Сохранить
                    </Button>
                    <Button
                        type='button'
                        extraClass={"admin-form__button"}
                        theme='text'
                        onClick={back}
                        spinnerActive={store.sending}
                    >
                        Отмена
                    </Button>
                </div>
            </form>
            {popup}
        </BasicPage>
    );
};

export default AdminNewsPage;
